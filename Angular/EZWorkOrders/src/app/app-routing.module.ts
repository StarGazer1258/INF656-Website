import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginPage } from './components/loginpage/loginpage.component'
import { RegisterPage } from './components/registerpage/registerpage.component'
import { HomePage } from './components/homepage/homepage.component'
import { NotFound } from './components/notfound/notfound.component'
import { WorkOrdersPage } from './components/workOrders/workOrders.component'
import { WorkOrderDetailsPage } from './components/workOrderdetailspage/workOrderdetailspage.component'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'workOrders', component: WorkOrdersPage },
  { path: 'workOrders/new', redirectTo: 'workOrders/details?new' },
  { path: 'workOrders/details', component: WorkOrderDetailsPage },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '/404' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
