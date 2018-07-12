import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { OpenIdConnectService } from "./open-id-connect.service";
import { Observable } from "rxjs";
import { Injectable } from "../../../../node_modules/@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class AddAuthorizationHeaderInterceptor implements HttpInterceptor {
    constructor(private openIdConnectService: OpenIdConnectService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler):
         Observable<HttpEvent<any>> {
        // add the access token as bearer token
        request = request.clone(
            { setHeaders: { Authorization: this.openIdConnectService.user.token_type 
                + " " + this.openIdConnectService.user.access_token } });
        return next.handle(request);
    }
}
