// Define the Order type
export type Order = {
  orderId: number
  customerName: string
  items: OrderItem[]
  total: number
  status: "pending" | "preparing" | "ready" | "delivered"
  timestamp: Date
  lastStatusChange: Date
  deliveryMethod: "delivery" | "pickup"
  chatTranscript: ChatMessage[]
  deliveryAddress?: string
}

// Define the Item type
export type OrderItem = {
  item_name: string
  category_name?: string
  quantity: number
  size: string
}

// Add these new type definitions
type AssistantResponse = {
  thought: string
  move1: string
  move2?: string
  response: string
  orderType?: string
  currentOrder: Array<{
    category: string
    item: string
    price: number
    quantity: number
    size: string
  }>
  totalAmount: number
}

type ChatMessage = {
  role: "user" | "assistant"
  content: string | AssistantResponse
}

// export function generateMockOrders(count: number): Order[] {
//   const statuses: Order["status"][] = ["pending", "preparing", "ready", "delivered"]
//   const menuItems = ["Pizza", "Burger", "Salad", "Pasta", "Sushi", "Taco", "Sandwich"]

//   return Array.from({ length: count }, (_, i) => {
//     const timestamp = new Date(Date.now() - Math.floor(Math.random() * 86400000))
//     return {
//       orderId: 1000 + i,
//       customerName: `Customer ${i + 1}`,
//       items: Array.from(
//         { length: Math.floor(Math.random() * 3) + 1 },
//         () => ({ item_name: menuItems[Math.floor(Math.random() * menuItems.length)], quantity: 1, size: 'Medium' })
//       ),
//       total: Math.floor(Math.random() * 100) + 10,
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       timestamp: timestamp,
//       lastStatusChange: timestamp,
//       deliveryMethod: Math.random() > 0.5 ? "Delivery" : "Pickup",
//       chatTranscript: [
//         { role: "user", content: "Hello" },
//         { 
//           role: "assistant", 
//           content: "Welcome to Pizza Del Re! Would you like to place an order today?" 
//         },
//         { 
//           role: "user", 
//           content: "Yes, I'd like a large pizza please" 
//         },
//         { 
//           role: "assistant", 
//           content: "Great! Which type of pizza would you like? We have Margherita, Funghi, Hawaii, and many more options." 
//         }
//       ]
//     }
//   })
// }

