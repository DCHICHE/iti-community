import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationStore } from './authentication.store';

/**
 * Allow HTTP request to be authenticated by injecteding the Bearer in the Authorization header
 * @see https://oauth.net/2/bearer-tokens
 */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private store: AuthenticationStore) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.store.accessToken) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.store.accessToken}`
            }
          });
        }

        return next.handle(req);
    }
}
