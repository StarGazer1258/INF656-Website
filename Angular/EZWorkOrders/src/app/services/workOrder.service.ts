import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { WorkOrder } from '../models/WorkOrder'
import { Count } from '../models/Count'

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(private http: HttpClient) { }

  getWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>('http://localhost:3000/api/workorders/get')
  }

  getWorkOrder(id: String): Observable<WorkOrder> {
    return this.http.get<WorkOrder>('http://localhost:3000/api/workorders/get/' + id)
  }

  workOrderCount(): Observable<Count> {
    return this.http.get<Count>('http://localhost:3000/api/workorders/count')
  }

  saveWorkOrder(workOrder: WorkOrder, isNew: Boolean) {
    if(isNew) {
      return this.http.post<WorkOrder>('http://localhost:3000/api/workorders/create/', workOrder).subscribe()
    } else {
      return this.http.put<WorkOrder>('http://localhost:3000/api/workorders/update/'+ workOrder._id, workOrder).subscribe()
    }
  }
}