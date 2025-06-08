import React, { createContext, useContext, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

// Define the type for event listeners
export type WebSocketEventListener = (data: any) => void

interface WebSocketContextType {
  addEventListener: (eventType: string, listener: WebSocketEventListener) => void
  removeEventListener: (eventType: string, listener: WebSocketEventListener) => void
  socket: Socket | null
  newOrderFlag: boolean
  setNewOrderFlag: (value: boolean) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

// Dynamic server URL selection
const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
const WS_URL = isLocal ? "http://localhost:8000" : "https://restaurant-vmqg.onrender.com"

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null)
  const listenersRef = useRef<Record<string, Set<WebSocketEventListener>>>({})
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null)
  const [newOrderFlag, setNewOrderFlag] = React.useState(false)

  const addEventListener = (eventType: string, listener: WebSocketEventListener) => {
    if (!listenersRef.current[eventType]) {
      listenersRef.current[eventType] = new Set()
    }
    listenersRef.current[eventType].add(listener)
    if (socketRef.current) {
      socketRef.current.on(eventType, listener)
    }
  }

  const removeEventListener = (eventType: string, listener: WebSocketEventListener) => {
    listenersRef.current[eventType]?.delete(listener)
    if (socketRef.current) {
      socketRef.current.off(eventType, listener)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const socket = io(WS_URL, {
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      transports: ["polling", "websocket"],
      upgrade: true,
      forceNew: false,
      path: "/socket.io",
      autoConnect: true,
    })
    socketRef.current = socket

    let currentSid = ""

    socket.on("connect", () => {
      currentSid = socket.id
      console.log("Socket.io connected", currentSid)
      socket.emit("dashboard_ready", { clientId: currentSid })
      // Attach all listeners
      Object.entries(listenersRef.current).forEach(([eventType, set]) => {
        set.forEach((listener) => {
          socket.on(eventType, listener)
        })
      })
      // Start heartbeat
      if (!heartbeatRef.current) {
        heartbeatRef.current = setInterval(() => {
          if (socket.connected) {
            socket.emit("heartbeat")
          }
        }, 25000)
      }
    })

    socket.io.on("reconnect", () => {
      currentSid = socket.id
      console.log("Socket.io reconnected", currentSid)
      socket.emit("dashboard_ready", { clientId: currentSid })
    })

    socket.on("disconnect", (reason) => {
      console.log("Socket.io disconnected", reason)
    })

    socket.on("connect_error", (err) => {
      console.error("Socket.io connection error:", err)
    })

    socket.on("heartbeat_ack", (data) => {
      console.log("Heartbeat acknowledged by server with sid:", data.sid)
    })

    socket.on("new_order", (data) => {
      setNewOrderFlag(true)
    })

    socket.onAny((event, ...args) => {
      console.log("Received event:", event, args)
    })

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current)
        heartbeatRef.current = null
      }
      if (socketRef.current) {
        Object.entries(listenersRef.current).forEach(([eventType, set]) => {
          set.forEach((listener) => {
            socketRef.current?.off(eventType, listener)
          })
        })
        socketRef.current.disconnect()
      }
    }
  }, [])

  return (
    <WebSocketContext.Provider value={{ addEventListener, removeEventListener, socket: socketRef.current, newOrderFlag, setNewOrderFlag }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error("useWebSocket must be used within a WebSocketProvider")
  return context
}
