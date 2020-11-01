import { Component, OnInit } from '@angular/core'
import { WorkOrder } from '../../models/WorkOrder'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { WorkOrderService } from 'src/app/services/workOrder.service'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'workorder-details-page',
  templateUrl: './workorderdetailspage.component.html',
  styleUrls: ['./workorderdetailspage.component.scss']
})
export class WorkOrderDetailsPage implements OnInit {

  workOrders: WorkOrder[]
  workOrder: WorkOrder
  ref: string

  constructor(private modalService: NgbModal, public router: Router, private route: ActivatedRoute, private workOrderService: WorkOrderService) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ref = params['ref']
      this.workOrderService.getWorkOrders().subscribe(data => {
        this.workOrders = data
      })
      if(this.ref !== undefined) {
          this.workOrder = this.workOrders.find((val) => val.reference === this.ref)
      } else {
        this.workOrder = {
          date: new Date(),
          reference: (this.workOrders.length + 1).toString(),

          customerName: "",
          phoneNumber: "",
          device: "",
          devicePassword: "",
          problem: "",

          technician: "",
          laborType: "",
          laborHours: 0,
          diagnosis: "",
          notes: "",
          parts: ""
        }
      }
    })
  }

  saveWorkOrder() {
    this.workOrderService.saveWorkOrder(this.workOrder)
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'go-back-modal-title'})
  }
}