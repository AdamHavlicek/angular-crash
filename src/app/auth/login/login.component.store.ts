import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { EMPTY, Observable } from 'rxjs';
import { catchError, concatMap, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { loginSuccess } from '../state/auth.actions';
import { getCallState } from '../state/auth.selectors';
import { CallState, getError, LoadingState } from '../state/auth.state';

export interface LoginState {
    callState: CallState;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
    constructor(
        private readonly authService: AuthService,
        private readonly store: Store<AppState>
    ) {
        super({
            callState: LoadingState.INIT,
        });
    }

    private readonly getLocalCallState$: Observable<boolean> = this.select((state) => {
        return state.callState === LoadingState.LOADING;
    });
    readonly getCallState$ = this.select(
        this.getLocalCallState$,
        (localCallState) => {
            return localCallState;
        },
    );

    readonly getErrorMessage$: Observable<string | null> = this.select(
        (state) => getError(state.callState)
    );

    readonly updateError = this.updater((state: LoginState, error: string) => {
        return {
            ...state,
            callState: {
                errorMessage: error,
            },
        };
    });

    readonly setLoading = this.updater((state: LoginState) => {
        return {
            ...state,
            callState: LoadingState.LOADING,
        };
    });

    readonly setLoaded = this.updater((state: LoginState) => {
        return {
            ...state,
            callState: LoadingState.LOADED,
        };
    });

    readonly login = this.effect(
        (plate$: Observable<{ email: string; password: string, localStore: ComponentStore<LoginState> }>) => {
            return plate$.pipe(
                concatMap((auth) => {
                    this.setLoading();
                    return this.authService
                        .login(auth.email, auth.password)
                        .pipe(
                            tapResponse(
                                (data) => {
                                    const user =
                                        this.authService.formatUser(data);
                                    this.authService.setUserToLocalStorage(
                                        user
                                    );

                                    this.setLoaded();
                                    this.store.dispatch(
                                        loginSuccess({
                                            result: {
                                                user,
                                                redirect: true,
                                            },
                                            callState: LoadingState.LOADED,
                                        })
                                    );
                                },
                                (err: any) => {
                                    const errorMessage =
                                        this.authService.getErrorMessage(
                                            err.error.error.message
                                        );
                                    this.updateError(errorMessage);
                                }
                            ),
                            catchError(() => EMPTY)
                        );
                })
            );
        }
    );
}
