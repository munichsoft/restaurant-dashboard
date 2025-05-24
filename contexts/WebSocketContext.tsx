import React, { createContext, useContext, useEffect, useRef } from "react"

// Define the type for event listeners
export type WebSocketEventListener = (data: any) => void

interface WebSocketContextType {
  addEventListener: (eventType: string, listener: WebSocketEventListener) => void
  removeEventListener: (eventType: string, listener: WebSocketEventListener) => void
  ws: WebSocket | null
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

const WS_URL = "wss://restaurant-vmqg.onrender.com" // Updated to your actual WebSocket server URL

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wsRef = useRef<WebSocket | null>(null)
  const listenersRef = useRef<Record<string, Set<WebSocketEventListener>>>({})
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null)
  const isUnmounted = useRef(false)

  const addEventListener = (eventType: string, listener: WebSocketEventListener) => {
    if (!listenersRef.current[eventType]) {
      listenersRef.current[eventType] = new Set()
    }
    listenersRef.current[eventType].add(listener)
  }

  const removeEventListener = (eventType: string, listener: WebSocketEventListener) => {
    listenersRef.current[eventType]?.delete(listener)
  }

  const connectWebSocket = () => {
    wsRef.current = new WebSocket(WS_URL)

    wsRef.current.onopen = () => {
      console.log("WebSocket connection established")
    }

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        const type = data.type
        if (type && listenersRef.current[type]) {
          listenersRef.current[type].forEach((listener) => listener(data))
        }
      } catch (err) {
        console.error("WebSocket message error:", err)
      }
    }

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    wsRef.current.onclose = (event) => {
      console.log("WebSocket connection closed", event.reason)
      if (!isUnmounted.current) {
        reconnectTimeout.current = setTimeout(connectWebSocket, 5000)
      }
    }
  }

  useEffect(() => {
    isUnmounted.current = false
    connectWebSocket()
    return () => {
      isUnmounted.current = true
      wsRef.current?.close()
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current)
    }
  }, [])

  return (
    <WebSocketContext.Provider value={{ addEventListener, removeEventListener, ws: wsRef.current }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error("useWebSocket must be used within a WebSocketProvider")
  return context
}
