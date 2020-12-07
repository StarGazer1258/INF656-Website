import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'register-page',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterPage {

  companyName: string
  emailAddress: string
  password: string
  confirmPassword: string

  regerror: boolean = false

  @ViewChild('userForm') form: any

  constructor(public router: Router, private accountService: AccountService) { }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  onSubmit({ valid }: { valid: boolean }) {
    if (!valid) {
      console.log('Form is not Valid');
    } else {
      this.accountService.registerUser({ companyName: this.companyName, email: this.emailAddress, password: this.password })
        .subscribe(res => {
          this.navigateByUrl('/login')
        }, err => {
          console.error(err)
          this.regerror = true
          this.form.reset()
        })
    }
  }
}