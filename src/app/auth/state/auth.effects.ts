import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import {
    setErrorMessage,
    setLoadingSpinner,
} from 'src/app/store/shared/shared.actions';
import { loginStart, loginSuccess } from './auth.actions';

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
                            this.store.dispatch(
                                setLoadingSpinner({ status: false })
                            );
                            this.store.dispatch(
                                setErrorMessage({ message: '' })
                            );
                            const user = this.authService.formatUser(data);
                            return loginSuccess({ user });
                        }),
                        catchError((err, caught) => {
                            this.store.dispatch(
                                setLoadingSpinner({ status: false })
                            );
                            const errorMessage = this.authService.getErrorMessage(
                                err.error.error.message
                            );
                            return of(
                                setErrorMessage({ message: errorMessage })
                            );
                        })
                    );
            })
        );
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(loginSuccess),
            tap((action) => {
                this.router.navigate([''])
            }) 
        )
    }, {dispatch: false})
}
