import { Component, OnInit } from '@angular/core'
import { WorkOrder } from '../../models/WorkOrder'
import { Count } from '../../models/Count'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { WorkOrderService } from 'src/app/services/workOrder.service'

@Component({
  selector: 'workorder-details-page',
  templateUrl: './workorderdetailspage.component.html',
  styleUrls: ['./workorderdetailspage.component.scss']
})
export class WorkOrderDetailsPage implements OnInit {

  workOrder: WorkOrder
  ref: string
  isNew: Boolean

  constructor(private modalService: NgbModal, public router: Router, private route: ActivatedRoute, private workOrderService: WorkOrderService) { }
  
  ngOnInit(): void {
    this.workOrder = {
      date: new Date(),
      reference: 0,
      
      customerName: null,
      phoneNumber: null,
      device: null,
      devicePassword: null,
      problem: null,

      technician: null,
      laborType: null,
      laborHours: 0,
      diagnosis: null,
      notes: null,
      parts: null
    }

    this.route.queryParams.subscribe(params => {
      if(params['id']) {
        this.workOrderService.getWorkOrder(params['id']).subscribe(data => this.workOrder = data)
        this.isNew = false
      } else {
        this.workOrderService.workOrderCount().subscribe(count => {
          this.workOrder = {
            date: new Date(),
            reference: count.count + 1,
            
            customerName: null,
            phoneNumber: null,
            device: null,
            devicePassword: null,
            problem: null,

            technician: null,
            laborType: null,
            laborHours: 0,
            diagnosis: null,
            notes: null,
            parts: null
          }
        })
        
        this.isNew = true
      }
    })
  }

  saveWorkOrder() {
    this.workOrderService.saveWorkOrder(this.workOrder, this.isNew)
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'go-back-modal-title'})
  }
}