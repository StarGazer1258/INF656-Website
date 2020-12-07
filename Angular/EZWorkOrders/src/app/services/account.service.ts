import { Injectable } from '@angular/core'
import { Observable, of, Subject} from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedIn: Subject<boolean>

  constructor(private http: HttpClient) {
    this.loggedIn = new Subject<boolean>()
    this.loggedIn.next(localStorage.getItem('token') !== null)
  }

  registerUser(user): Observable<any> {
    return this.http.post(`http://localhost:3000/api/users/register`, user)
  }

  login(user): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/users/login`, user)
  }

  logout() {
    localStorage.removeItem('token')
    this.setLoggedIn(false)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setLoggedIn(logged) {
    this.loggedIn.next(logged)
  }

  isLoggedIn(): Observable<boolean> {
    setTimeout(() => this.loggedIn.next(localStorage.getItem('token') !== null), 0)
    return this.loggedIn.asObservable()
  }
}