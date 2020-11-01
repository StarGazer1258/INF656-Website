import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { WorkOrder } from '../../models/WorkOrder'
import { WorkOrderService } from '../../services/workOrder.service'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'workOrders-page',
  templateUrl: './workorders.component.html',
  styleUrls: ['./workorders.component.scss']
})

export class WorkOrdersPage implements OnInit {

  workOrders: WorkOrder[]
  loading: boolean

  constructor(public router: Router, private workOrderService: WorkOrderService) { }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  ngOnInit(): void {
    this.workOrderService.getWorkOrders().subscribe(data => this.workOrders = data)
    this.loading = false
  }
}