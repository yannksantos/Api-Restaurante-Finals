import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService)

  const token = userService.getToken();

  const authReq = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
  })

  return next(authReq);
};
