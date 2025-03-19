"use client"

import { useState, useEffect, type MouseEvent } from "react"
import { useTranslation } from "react-i18next"
import type { Order } from "@/utils/mockData"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { OrderDetails } from "./order-details"
import { Button } from "@/components/ui/button"
import { updateOrderStatus } from "./api"

export default function OrderList({
  orders,
  onOrderUpdate,
}: { orders: Order[]; onOrderUpdate: (updatedOrder: Order) => void }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [_, setOrders] = useState(orders)
  const { t } = useTranslation()

  useEffect(() => {
    //setOrders(initialOrders)  Removed as we are directly using passed orders
  }, []) //Empty dependency array to prevent infinite loop

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  const handleStatusChange = async (orderId: number, newStatus: Order["status"]) => {
    const now = new Date()

    try {
      await updateOrderStatus(orderId, newStatus)

      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus, lastStatusChange: now } : order
      )
      setOrders(updatedOrders)
      const updatedOrder = updatedOrders.find((order) => order.orderId === orderId)
      if (updatedOrder) {
        onOrderUpdate(updatedOrder)
      }
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus, lastStatusChange: now })
      }
    } catch (error) {
      console.error("Failed to update order status:", error)
      // Optionally, display an error message to the user
    }
  }

  const handleReadyClick = (orderId: number, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation() // Prevent opening the modal when clicking the button
    handleStatusChange(orderId, "ready")
  }

  const shouldHighlight = (order: Order) => {
    if (order.status !== "pending" && order.status !== "preparing") {
      return false
    }
    const now = new Date()
    const timeDiff = now.getTime() - order.lastStatusChange.getTime()
    return timeDiff > 15 * 60 * 1000 // 15 minutes in milliseconds
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("orderId")}</TableHead>
            <TableHead>{t("customer")}</TableHead>
            <TableHead>{t("items")}</TableHead>
            <TableHead className="text-right">{t("total")}</TableHead>
            <TableHead className="text-right">{t("status")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.orderId}
              className={`cursor-pointer hover:bg-muted/50 ${
                shouldHighlight(order) ? "bg-red-100 dark:bg-red-900" : ""
              }`}
              onClick={() => handleOrderClick(order)}
            >
              <TableCell className="font-medium">{order.orderId}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <ul className="list-none pl-4">
                  {order.items.map((item) => (
                    <li key={item.item_name} className="before:content-['•'] before:mr-1">
                      {item.category_name} {item.item_name} X {item.quantity} {item.size}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Badge variant={getStatusVariant(order.status)}>{t(order.status)}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleReadyClick(order.orderId, e)}
                  disabled={order.status === "ready" || order.status === "delivered"}
                >
                  {t("ready")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <OrderDetails
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
      />
    </>
  )
}

function getStatusVariant(status: Order["status"]): "default" | "secondary" | "destructive" | "outline" | "success" {
  switch (status) {
    case "pending":
      return "default"
    case "preparing":
      return "secondary"
    case "ready":
      return "success"
    case "delivered":
      return "destructive"
    default:
      return "default"
  }
}

