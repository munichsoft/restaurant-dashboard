export type Order = {
  orderId: number
  customerName: string
  items: OrderItem[]
  total: number
  status: "pending" | "preparing" | "ready" | "delivered"
  timestamp: Date
  lastStatusChange: Date
}

// Define the Item type
export type OrderItem = {
  item_name: string
  category_name?: string
  quantity: number
  size: string
};

export function generateMockOrders(count: number): Order[] {
  const statuses: Order["status"][] = ["pending", "preparing", "ready", "delivered"]
  const menuItems = ["Pizza", "Burger", "Salad", "Pasta", "Sushi", "Taco", "Sandwich"]

  return Array.from({ length: count }, (_, i) => {
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 86400000))
    return {
      orderId: 1000 + i,
      customerName: `Customer ${i + 1}`,
      items: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => ({ item_name: menuItems[Math.floor(Math.random() * menuItems.length)], quantity: 1, size: 'Medium' })
      ),
      total: Math.floor(Math.random() * 100) + 10,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: timestamp,
      lastStatusChange: timestamp,
    }
  })
}

