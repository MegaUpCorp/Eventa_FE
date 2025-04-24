
export interface Transaction {
  orderId: string
  eventId: string
  accountID: string
  total: number
  subscriptionPalnId: string 
  orderType: string
  paymentStatus: string
  name: string 
  createdAt: string
  status: string
  paymentMethod: string
  customerEmail: string
  customerPhone: string 
  note: string 
  qrCode: string 
  refundDate: string 
  refundReason: string
  isManualRefund: boolean
}
