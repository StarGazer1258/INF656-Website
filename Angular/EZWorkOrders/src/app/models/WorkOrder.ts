export interface WorkOrder {
  date: Date
  reference: string
  
  customerName: string
  phoneNumber: string
  device: string
  devicePassword: string
  problem: string

  technician: string
  laborType: string
  laborHours: number
  diagnosis: string
  notes: string
  parts: string
}