import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '../services/auth-state.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authStateService = inject(AuthStateService);
    const token = authStateService.getToken();

    // Clone la requête et ajoute le header Authorization si le token existe
    const authReq = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        : req;

    return next(authReq);
};
