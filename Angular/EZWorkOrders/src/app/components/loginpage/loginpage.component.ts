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

  @ViewChild('userForm') form: any

  constructor(public router: Router, private accountService: AccountService) { }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  setLoggedIn(loggedIn) {
    this.accountService.setLoggedIn(loggedIn)
  }

  onSubmit({ valid }: { valid: boolean }) {
    if (!valid) {
      console.log('Form is not Valid');
    } else {
      // Authenticate user
      this.form.reset();
    }
  }
}
