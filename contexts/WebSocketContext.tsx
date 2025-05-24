import React, { createContext, useContext, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

// Define the type for event listeners
export type WebSocketEventListener = (data: any) => void

interface WebSocketContextType {
  addEventListener: (eventType: string, listener: WebSocketEventListener) => void
  removeEventListener: (eventType: string, listener: WebSocketEventListener) => void
  socket: Socket | null
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

const WS_URL = "wss://restaurant-vmqg.onrender.com" // Socket.io server URL

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null)
  const listenersRef = useRef<Record<string, Set<WebSocketEventListener>>>({})
  const isUnmounted = useRef(false)

  const addEventListener = (eventType: string, listener: WebSocketEventListener) => {
    if (!listenersRef.current[eventType]) {
      listenersRef.current[eventType] = new Set()
    }
    listenersRef.current[eventType].add(listener)
    // Attach to socket if available
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
    isUnmounted.current = false
    // Use Socket.io client
    const socket = io(WS_URL, {
      transports: ["websocket"],
      path: "/socket.io", // default path, change if your backend uses a custom one
      autoConnect: true,
      reconnection: true,
    })
    socketRef.current = socket

    socket.on("connect", () => {
      console.log("Socket.io connected")
      // Re-attach all listeners
      Object.entries(listenersRef.current).forEach(([eventType, set]) => {
        set.forEach((listener) => {
          socket.on(eventType, listener)
        })
      })
    })

    socket.on("disconnect", (reason) => {
      console.log("Socket.io disconnected", reason)
    })

    socket.on("connect_error", (err) => {
      console.error("Socket.io connection error:", err)
    })

    return () => {
      isUnmounted.current = true
      if (socketRef.current) {
        // Remove all listeners
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
    <WebSocketContext.Provider value={{ addEventListener, removeEventListener, socket: socketRef.current }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error("useWebSocket must be used within a WebSocketProvider")
  return context
}
