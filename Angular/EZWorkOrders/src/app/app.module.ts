import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './components/app/app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { WorkOrdersPage } from './components/workOrders/workOrders.component'
import { HomePage } from './components/homepage/homepage.component'
import { LoginPage } from './components/loginpage/loginpage.component'
import { NotFound } from './components/notfound/notfound.component'
import { RegisterPage } from './components/registerpage/registerpage.component'
import { WorkOrderDetailsPage } from './components/workOrderdetailspage/workOrderdetailspage.component'
import { CommonModule } from '@angular/common'
import { WorkOrderService } from './services/workOrder.service'
import { FormsModule } from '@angular/forms'
import { AccountService } from './services/account.service'

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPage,
    NotFound,
    RegisterPage,
    WorkOrderDetailsPage,
    WorkOrdersPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WorkOrderService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
