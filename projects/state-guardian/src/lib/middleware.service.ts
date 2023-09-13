import { Injectable } from '@angular/core';

// middleware.service.ts
@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {
  private middlewares: Function[] = [];

  addMiddleware(fn: Function) {
    this.middlewares.push(fn);
  }

  intercept(actionType: string, payload: any) {
    this.middlewares.forEach(middleware => {
      middleware(actionType, payload);
    });
  }
}
