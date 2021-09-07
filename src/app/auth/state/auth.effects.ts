import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'
import { AppState } from 'src/app/store/app.state'
import {
    autoLogin,
    autoLogout,
    loginFailure,
    loginStart,
    loginSuccess,
    signUpFailure,
    signUpStart,
    signUpSuccess
} from './auth.actions'
import { ErrorState, LoadingState } from './auth.state'
// import { ErrorState, LoadingState } from './auth.state';

@Injectable()
export class AuthEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthService,
        private readonly store: Store<AppState>,
        private readonly router: Router
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService
                    .login(action.result.email, action.result.password)
                    .pipe(
                        map((data) => {
                            // this.store.dispatch(
                            //     setErrorMessage({ message: '' })
                            // );
                            const user = this.authService.formatUser(data)
                            this.authService.setUserToLocalStorage(user)
                            return loginSuccess({
                                result: {
                                    user,
                                    redirect: true
                                },
                                callState: LoadingState.LOADED
                                // isLoaded: true,
                                // isLoading: false,
                                // errorMessage: null
                            })
                        }),
                        catchError((err: HttpErrorResponse, _caught) => {
                            let errorMessage: string
                            if (!!err.error) {
                                errorMessage = this.authService.getErrorMessage(
                                    err.error.error.message
                                )
                            } else {
                                errorMessage = `Error code: ${err.status} \nMessage: ${err.message}`
                            }

                            return of(
                                loginFailure({
                                    result: null,
                                    callState: { errorMessage } as ErrorState
                                    // isLoaded: false,
                                    // isLoading: false,
                                    // errorMessage
                                })
                            )
                        })
                    )
            })
        )
    })

    redirectToHomePage$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginSuccess, signUpSuccess),
                tap((action) => {
                    if (action.result.redirect) {
                        this.router.navigate([''])
                    }
                })
            )
        },
        { dispatch: false }
    )

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpStart),
            exhaustMap((action) => {
                return this.authService
                    .signup(action.result.email, action.result.password)
                    .pipe(
                        map((data) => {
                            const user = this.authService.formatUser(data)
                            this.authService.setUserToLocalStorage(user)
                            return signUpSuccess({
                                result: { user, redirect: true },
                                callState: LoadingState.LOADED
                                // isLoaded: true,
                                // isLoading: false,
                                // errorMessage: null
                            })
                        }),
                        catchError((err, caught) => {
                            const errorMessage =
                                this.authService.getErrorMessage(
                                    err.error.error.message
                                )
                            return of(
                                signUpFailure({
                                    result: null,
                                    callState: { errorMessage }
                                    // isLoading: false,
                                    // isLoaded: false,
                                    // errorMessage,
                                })
                            )
                        })
                    )
            })
        )
    })

    autoLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogin),
                mergeMap((action) => {
                    const user = this.authService.getUserFromLocalStorage()
                    if (user) {
                        return of(
                            loginSuccess({
                                result: { user, redirect: false },
                                callState: LoadingState.LOADED
                                // isLoaded: true,
                                // isLoading: false,
                                // errorMessage: null
                            })
                        )
                    } else {
                        return of(
                            loginFailure({
                                result: null,
                                callState: LoadingState.LOADED
                                // isLoaded: false,
                                // isLoading: false,
                                // errorMessage: null
                            })
                        )
                    }
                })
            )
        },
        { dispatch: true }
    )

    autoLogout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogout),
                tap((action) => {
                    this.authService.logout()
                    this.router.navigate(['auth'])
                })
            )
        },
        { dispatch: false }
    )
}
