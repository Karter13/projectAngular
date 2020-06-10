import { Injectable } from "@angular/core";
import { LoaderService } from "./loader.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqCopy = req;
    let isNeedLoader = false;
    if (req.headers.has('x-loader')) {
      isNeedLoader = true;
      this.loaderService.setLoaderStatus(true);
      reqCopy = req.clone({headers: req.headers.delete('x-loader')});
    }
    return next.handle(reqCopy)
      .pipe(
        finalize(() => {
          if (isNeedLoader) {
            this.loaderService.setLoaderStatus(false);
          }
        })
      );
  }
}
