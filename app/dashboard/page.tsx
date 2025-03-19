"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMockOrders, type Order } from "@/utils/mockData"
import { DollarSign, ShoppingBag, Clock, ChefHat } from "lucide-react"
import OrderList from "./order-list"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import DetailedChart from "./DetailedChart"
import { getOrders } from "./api"

// Sample analytics data
const dishSalesData = [
  { name: "Margherita", sales: 150, revenue: 975 },
  { name: "Hawaii", sales: 120, revenue: 948 },
  { name: "Salami", sales: 110, revenue: 825 },
  { name: "Kebab", sales: 90, revenue: 810 },
  { name: "Tonno", sales: 85, revenue: 722.5 },
]

const categorySalesData = [
  { name: "Pizza", sales: 450, revenue: 3825 },
  { name: "Burger", sales: 280, revenue: 1820 },
  { name: "Pasta", sales: 220, revenue: 1760 },
  { name: "Kebab", sales: 180, revenue: 1530 },
  { name: "Salat", sales: 150, revenue: 1200 },
]

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeFilter, setActiveFilter] = useState<"all" | Order["status"]>("all")
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState<{ name: string; type: "dish" | "category" } | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders("1")
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const todaysOrders = fetchedOrders.filter((order) => {
          const orderDate = new Date(order.timestamp)
          orderDate.setHours(0, 0, 0, 0)
          return orderDate.getTime() === today.getTime()
        })
        console.log(todaysOrders)
        setOrders(todaysOrders)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
        // Optionally, setOrders to an empty array or display an error message
      }
    }
    fetchOrders()
  }, [])

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const preparingOrders = orders.filter((order) => order.status === "preparing").length
  const averagePrepTime = calculateAveragePrepTime(orders)

  function calculateAveragePrepTime(orders: Order[]): number {
    const preparedOrders = orders.filter((order) => order.status === "ready" || order.status === "delivered")
    if (preparedOrders.length === 0) return 0
    const totalPrepTime = preparedOrders.reduce((sum, order) => {
      const prepTime = (order.lastStatusChange.getTime() - order.timestamp.getTime()) / (1000 * 60) // in minutes
      return sum + prepTime
    }, 0)
    return Math.round(totalPrepTime / preparedOrders.length)
  }

  /*useEffect(() => {
    const interval = setInterval(() => {
      const fetchNewOrders = async () => {
        try {
          const newOrders = await getOrders("1")
          const today = new Date()

          today.setHours(0, 0, 0, 0)

          const todaysOrders = newOrders.filter((order) => {
            const orderDate = new Date(order.timestamp)
            orderDate.setHours(0, 0, 0, 0)
            return orderDate.getTime() === today.getTime()
          })

          setOrders(todaysOrders)
        } catch (error) {
          console.error("Failed to fetch new orders:", error)
        }
      }
      fetchNewOrders()
    }, 500000) // Fetch new orders every 5 minutes

    return () => clearInterval(interval)
  }, [])*/

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrders((currentOrders) => currentOrders.map((order) => (order.orderId === updatedOrder.orderId ? updatedOrder : order)))
  }

  const handleBarClick = (data: any, type: "dish" | "category") => {
    setSelectedItem({ name: data.name, type })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
          <TabsTrigger value="reports" disabled>
            {t("reports")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("totalRevenue")} ({t("today")})
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("pendingOrders")}</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground">+180.1% from last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("preparing")}</CardTitle>
                <ChefHat className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{preparingOrders}</div>
                <p className="text-xs text-muted-foreground">+19% from last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("averagePrepTime")}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averagePrepTime} minutes</div>
                <p className="text-xs text-muted-foreground">-2 minutes from yesterday</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("todaysOrders")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-x-2">
                  <Button
                    variant={activeFilter === "all" ? "default" : "outline"}
                    onClick={() => setActiveFilter("all")}
                  >
                    {t("clearFilters")}
                  </Button>
                  <Button
                    variant={activeFilter === "pending" ? "default" : "outline"}
                    onClick={() => setActiveFilter("pending")}
                  >
                    {t("pending")}
                  </Button>
                  <Button
                    variant={activeFilter === "preparing" ? "default" : "outline"}
                    onClick={() => setActiveFilter("preparing")}
                  >
                    {t("preparing")}
                  </Button>
                  <Button
                    variant={activeFilter === "ready" ? "default" : "outline"}
                    onClick={() => setActiveFilter("ready")}
                  >
                    {t("ready")}
                  </Button>
                  <Button
                    variant={activeFilter === "delivered" ? "default" : "outline"}
                    onClick={() => setActiveFilter("delivered")}
                  >
                    {t("delivered")}
                  </Button>
                </div>
                <OrderList
                  orders={orders.filter((order) => activeFilter === "all" || order.status === activeFilter)}
                  onOrderUpdate={handleOrderUpdate}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>{t("mostSoldDishes")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={dishSalesData}>
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="var(--primary)" />
                      <YAxis yAxisId="right" orientation="right" stroke="var(--primary)" />
                      <Tooltip />
                      <Bar
                        dataKey="sales"
                        yAxisId="left"
                        fill="var(--primary)"
                        name={t("orders")}
                        onClick={(data) => handleBarClick(data, "dish")}
                      />
                      <Bar
                        dataKey="revenue"
                        yAxisId="right"
                        fill="var(--primary-foreground)"
                        name={t("revenue") + " (€)"}
                        onClick={(data) => handleBarClick(data, "dish")}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {dishSalesData.map((dish) => (
                      <div key={dish.name} className="flex justify-between items-center">
                        <span>{dish.name}</span>
                        <div className="space-x-4">
                          <span>
                            {dish.sales} {t("orders")}
                          </span>
                          <span>{dish.revenue.toFixed(2)} €</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>{t("topCategories")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={categorySalesData}>
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="var(--primary)" />
                      <YAxis yAxisId="right" orientation="right" stroke="var(--primary)" />
                      <Tooltip />
                      <Bar
                        dataKey="sales"
                        yAxisId="left"
                        fill="var(--primary)"
                        name={t("orders")}
                        onClick={(data) => handleBarClick(data, "category")}
                      />
                      <Bar
                        dataKey="revenue"
                        yAxisId="right"
                        fill="var(--primary-foreground)"
                        name={t("revenue") + " (€)"}
                        onClick={(data) => handleBarClick(data, "category")}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {categorySalesData.map((category) => (
                      <div key={category.name} className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <div className="space-x-4">
                          <span>
                            {category.sales} {t("orders")}
                          </span>
                          <span>{category.revenue.toFixed(2)} €</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {selectedItem && <DetailedChart item={selectedItem.name} type={selectedItem.type} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}



