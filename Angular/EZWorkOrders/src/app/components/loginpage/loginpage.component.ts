import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'login-page',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginPage {

  emailAddress: string
  password: string

  loginerror: boolean = false

  @ViewChild('userForm') form: any

  constructor(public router: Router, private accountService: AccountService) { }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  onSubmit({ valid }: { valid: boolean }) {
    if (!valid) {
      console.log('Form is not Valid');
    } else {
      this.accountService.login({ email: this.emailAddress, password: this.password })
        .subscribe(res => {
          localStorage.setItem('token', res.token)
          this.accountService.setLoggedIn(true)
          this.navigateByUrl('/workOrders')
        }, err => {
          this.loginerror = true
          this.form.reset()
        })
      
    }
  }
}
