import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import {
    autoLogin,
    autoLogout,
    loginFailure,
    loginStart,
    loginSuccess,
    signupFailure,
    signupStart,
    signupSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthService,
        private store: Store<AppState>,
        private readonly router: Router
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService
                    .login(action.email, action.password)
                    .pipe(
                        map((data) => {
                            // this.store.dispatch(
                            //     setErrorMessage({ message: '' })
                            // );
                            const user = this.authService.formatUser(data);
                            this.authService.setUserToLocalStorage(user);
                            return loginSuccess({ user, redirect: true });
                        }),
                        catchError((err, caught) => {
                            const errorMessage = this.authService.getErrorMessage(
                                err.error.error.message
                            );
                            return of(loginFailure({ reason: errorMessage }));
                        })
                    );
            })
        );
    });

    redirectToHomePage$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginSuccess, signupSuccess),
                tap((action) => {
                    if (action.redirect) {
                        this.router.navigate(['']);
                    }
                })
            );
        },
        { dispatch: false }
    );

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authService
                    .signup(action.email, action.password)
                    .pipe(
                        map((data) => {
                            const user = this.authService.formatUser(data);
                            this.authService.setUserToLocalStorage(user);
                            return signupSuccess({ user, redirect: true });
                        }),
                        catchError((err, caught) => {
                            const errorMessage = this.authService.getErrorMessage(
                                err.error.error.message
                            );
                            return of(signupFailure({ reason: errorMessage }));
                        })
                    );
            })
        );
    });

    autoLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogin),
                mergeMap((action) => {
                    const user = this.authService.getUserFromLocalStorage();
                    return of(loginSuccess({ user, redirect: false }));
                })
            );
        },
        { dispatch: true }
    );

    autoLogout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogout),
                tap((action) => {
                    this.authService.logout();
                    this.router.navigate(['auth']);
                })
            );
        },
        { dispatch: false }
    );
}
