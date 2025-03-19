import type { Order } from "@/utils/mockData"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrderDetailsProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onStatusChange: (orderId: number, newStatus: Order["status"]) => void
}

export function OrderDetails({ order, isOpen, onClose, onStatusChange }: OrderDetailsProps) {
  if (!order) return null

  const handleStatusChange = (newStatus: Order["status"]) => {
    onStatusChange(order.orderId, newStatus)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Order ID:</span>
            <span className="col-span-3">{order.orderId}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Customer:</span>
            <span className="col-span-3">{order.customerName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Items:</span>
            <span className="col-span-3">
              <ul className="list-none">
                    {order.items.map((item) => (
                      <li key={item.item_name} className="before:content-['•'] before:mr-1">
                        {item.category_name} {item.item_name} X {item.quantity} {item.size}
                      </li>
                    ))}
              </ul>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Total:</span>
            <span className="col-span-3">${order.total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Status:</span>
            <span className="col-span-3">
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Time:</span>
            <span className="col-span-3">{order.timestamp.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Change Status:</span>
            <Select onValueChange={handleStatusChange} defaultValue={order.status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
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

