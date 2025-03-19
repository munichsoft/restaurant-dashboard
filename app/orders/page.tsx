"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateMockOrders, type Order } from "@/utils/mockData"
import OrderList from "../dashboard/order-list"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [dateFilter, setDateFilter] = useState("")
  const [customerFilter, setCustomerFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    const allOrders = generateMockOrders(100) // Generate a larger set of orders
    setOrders(allOrders)
    setFilteredOrders(allOrders)
  }, [])

  useEffect(() => {
    let filtered = orders

    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.timestamp)
        return orderDate.toDateString() === filterDate.toDateString()
      })
    }

    if (customerFilter) {
      filtered = filtered.filter((order) => order.customerName.toLowerCase().includes(customerFilter.toLowerCase()))
    }

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, dateFilter, customerFilter, statusFilter])

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrders((currentOrders) => currentOrders.map((order) => (order.orderId === updatedOrder.orderId ? updatedOrder : order)))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">All Orders</h2>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                placeholder="Search by customer name"
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderList orders={filteredOrders} onOrderUpdate={handleOrderUpdate} />
        </CardContent>
      </Card>
    </div>
  )
}

