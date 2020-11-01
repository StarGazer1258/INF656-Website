import { Injectable } from '@angular/core'
import { Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedIn: Subject<boolean>

  constructor() {
    this.loggedIn = new Subject<boolean>()
    this.loggedIn.next(false)
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable()
  }

  setLoggedIn(loggedIn: boolean): void {
    this.loggedIn.next(loggedIn)
  }
}