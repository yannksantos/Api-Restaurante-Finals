import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const userGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const userService = inject(UserService)

  const logado = userService.estaLogado();
  if (!logado) {
    router.navigate(['']);
    return false;
  }
  return true;
};
