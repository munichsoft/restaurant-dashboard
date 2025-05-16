import type { Order } from "@/utils/mockData"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { type OrderItem } from "@/utils/mockData"
import { useState } from "react"
import { ArrowLeft, MessageSquare } from "lucide-react"

interface OrderDetailsProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onStatusChange: (orderId: number, newStatus: Order["status"]) => void
}

function extractAssistantMessage(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString)
    if (parsed.response) {
      return parsed.response.replace(/\\n/g, '\n')
    }
    return "Error: No response found"
  } catch (e) {
    return "Error parsing response"
  }
}

export function OrderDetails({ order, isOpen, onClose, onStatusChange }: OrderDetailsProps) {
  const [showChat, setShowChat] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const { t } = useTranslation()

  if (!order) return null

  const handleStatusChange = (newStatus: Order["status"]) => {
    onStatusChange(order.orderId, newStatus)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !order) return

    const newChatMessage = {
      role: "assistant" as const,
      content: JSON.stringify({
        response: newMessage,
        thought: "Direct message to customer",
        move1: "reply",
      })
    }

    // Update the order's chat transcript
    order.chatTranscript = [...order.chatTranscript, newChatMessage]
    setNewMessage("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[650px] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {showChat && (
              <Button variant="ghost" size="icon" onClick={() => setShowChat(false)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>{showChat ? t("chat_transcript") : t("order_details")}</DialogTitle>
          </div>
        </DialogHeader>
        {!showChat ? (
          <div className="flex-1 overflow-y-auto">
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
                <span className="font-bold">{t("deliveryMethod")}:</span>
                <span className="col-span-3">
                  <Badge variant={order.deliveryMethod === "delivery" ? "destructive" : "success"}>
                    {t(order.deliveryMethod)}
                  </Badge>
                </span>
              </div>
              {order.deliveryMethod === "delivery" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold">{t("deliveryAddress")}:</span>
                  <span className="col-span-3">{order.deliveryAddress || "-"}</span>
                </div>
              )}
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
                  <SelectTrigger className="col-span-2">
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
          </div>
        ) : (
          <div className="flex flex-col flex-1 h-full">
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {!order.chatTranscript ? (
                  <div className="p-3 rounded-lg bg-muted">
                  <p className="text-muted-foreground">{t("no_chat_history")}</p>
                  </div>
                ) : (
                  order.chatTranscript.map((message, index) => (
                  <div
                    key={index}
                    style={{
                    margin: '8px 0',
                    textAlign: message.role === 'user' ? 'right' : 'left',
                    }}
                  >
                    <span
                    style={{
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: '16px',
                      background: message.role === 'user' ? '#e0f7fa' : '#f1f8e9',
                      color: '#333',
                      maxWidth: '70%',
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-line',
                    }}
                    >
                    <b>{message.role === 'user' ? t('customer') : t('assistant')}:</b>{' '}
                    {message.role === 'user' ? String(message.content) : extractAssistantMessage(String(message.content))}
                    </span>
                  </div>
                  ))
                )}
                </div>
            </div>
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2 items-center">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t("type_message")}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="shrink-0"
                >
                  {t("send")}
                </Button>
              </div>
            </div>
          </div>
        )}
        {!showChat && (
          <div className="flex justify-between pt-4 border-t">
            <Button onClick={() => setShowChat(true)} variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              {t("chat_transcript")}
            </Button>
            <Button onClick={onClose}>{t("close")}</Button>
          </div>
        )}
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

