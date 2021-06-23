import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { loginFailure, loginStart, loginSuccess, signupFailure, signupStart, signupSuccess } from 'src/app/auth/state/auth.actions';
import { AppState } from '../app.state';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';

@Injectable()
export class SharedEffects {
    constructor(
        private readonly actions$: Actions,
        private store: Store<AppState>
    ) {}

    showLoadingSpinner$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginStart, signupStart),
                tap((action) => {
                    this.store.dispatch(setLoadingSpinner({ showSpinner: true }));
                })
            );
        },
        {
            dispatch: false,
        }
    );

    hideLoadingSpinner$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginFailure, signupFailure, loginSuccess, signupSuccess),
                tap((action) => {
                    this.store.dispatch(setLoadingSpinner({ showSpinner: false }));
                })
            );
        },
        {
            dispatch: false,
        }
    );

    setErrorMessage$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginFailure, signupFailure),
                tap(action => {
                    this.store.dispatch(setErrorMessage({message: action.reason}))
                })
            )
        }, {
           dispatch: false 
        }
    )

    resetErrorMessage$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginStart, signupStart),
                tap(action => {
                    this.store.dispatch(setErrorMessage({message: ''}))
                })
            )
        }, {
            dispatch: false
        }
    )
}
