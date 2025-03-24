import type { Order } from "@/utils/mockData"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type OrderItem } from "@/utils/mockData"
interface OrderDetailsProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onStatusChange: (orderId: number, newStatus: Order["status"]) => void
}

export function OrderDetails({ order, isOpen, onClose, onStatusChange }: OrderDetailsProps) {
  const { t } = useTranslation()

  if (!order) return null

  const handleStatusChange = (newStatus: Order["status"]) => {
    onStatusChange(order.orderId, newStatus)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("order_details")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">{t("orderId")}:</span>
            <span className="col-span-3">{order.orderId}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">{t("customer")}:</span>
            <span className="col-span-3">{order.customerName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">{t("items")}:</span>
            <span className="col-span-3">
            <ul className="list-none">
              {order.items.map((item: OrderItem, index) => (
                <li 
                  key={`${item.item_name}-${index}`} 
                  className="before:content-['•'] before:mr-1"
                >
                  {item.category_name ? 
                    `${item.category_name} ${item.item_name}` : 
                    item.item_name} X {item.quantity} {item.size}
                </li>
              ))}
            </ul>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">{t("total")}: </span>
            <span className="col-span-3">${order.total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">{t("status")}:</span>
            <span className="col-span-3">
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">{t("time")}:</span>
            <span className="col-span-3">{order.timestamp.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">{t("status")}:</span>
            <Select onValueChange={handleStatusChange} defaultValue={order.status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">{t("pending")}</SelectItem>
                <SelectItem value="preparing">{t("preparing")}</SelectItem>
                <SelectItem value="ready">{t("ready")}</SelectItem>
                <SelectItem value="delivered">{t("delivered")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={onClose}>{t("close")}</Button>
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

