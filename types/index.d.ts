export type Order = {
  orderId: number
  timestamp: Date
  total: number
  status: "pending" | "preparing" | "ready" | "delivered"
  customerName: string
  items: { item_name: string; price: string; quantity: number }[]
  lastStatusChange: Date
}
