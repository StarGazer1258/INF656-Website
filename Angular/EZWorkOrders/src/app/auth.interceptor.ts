import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AccountService } from "./services/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.accountService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}` 
            }
        });
        return next.handle(req);
    }
}