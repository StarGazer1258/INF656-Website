import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  loggedIn: boolean

  constructor(public router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.isLoggedIn().subscribe(isLoggedIn => {this.loggedIn = isLoggedIn})
  }

  logout() {
    this.accountService.logout()
  }
}