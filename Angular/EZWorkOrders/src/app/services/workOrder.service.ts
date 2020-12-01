import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { WorkOrder } from '../models/WorkOrder'
import { EXAMPLE_WORKORDERS } from '../exampleData'

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  workOrders: WorkOrder[]

  constructor(private http: HttpClient) {
    this.workOrders = EXAMPLE_WORKORDERS
    
  }

  getWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>('http://localhost:3000/api/workorders/get')
  }

  saveWorkOrder(workOrder: WorkOrder): void {
    let existingWorkOrder = this.workOrders.findIndex(val => val.reference === workOrder.reference)
    if(existingWorkOrder >= 0) {
      console.log("replacing existing work order " + existingWorkOrder)
      this.workOrders.splice(existingWorkOrder, 1, workOrder)
    } else {
      console.log("pushing new work order " + workOrder.reference)
      this.workOrders.unshift(workOrder)
    }
  }
}