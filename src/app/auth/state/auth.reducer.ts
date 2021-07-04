import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import {
    autoLogout,
    loginFailure,
    loginStart,
    loginSuccess,
    resetCallState,
    signUpFailure,
    signUpStart,
    signUpSuccess,
} from './auth.actions';
import { initialState, LoadingState } from './auth.state';

const _authReducer = createReducer(
    initialState,
    on(loginStart, (state, action) => {
        return {
            ...state,
            // isLoaded: action.isLoaded,
            // isLoading: action.isLoading,
            // errorMessage: action.errorMessage
            callState: action.callState,
        };
    }),
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.result.user,
            callState: action.callState,
            // isLoaded: action.isLoaded,
            // isLoading: action.isLoading,
            // errorMessage: action.errorMessage
        };
    }),
    on(loginFailure, (state, action) => {
        return {
            ...state,
            callState: action.callState,
            // isLoaded: action.isLoaded,
            // isLoading: action.isLoading,
            // errorMessage: action.errorMessage
        };
    }),
    on(signUpStart, (state, action) => {
        return {
            ...state,
            callState: action.callState,
        };
    }),
    on(signUpSuccess, (state, action) => {
        return {
            ...state,
            user: action.result.user,
            // isLoaded: action.isLoaded,
            // isLoading: action.isLoading,
            // errorMessage: action.errorMessage
            callState: action.callState,
        };
    }),
    on(signUpFailure, (state, action) => {
        console.log(action.callState);
        return {
            ...state,
            callState: action.callState,
        };
    }),
    on(autoLogout, (state) => {
        return {
            ...state,
            user: null,
            // isLoaded: false,
            // isLoading: false,
            // errorMessage: null
        };
    }),
    on(resetCallState, (state) => {
        if (state.callState !== LoadingState.INIT) {
            return {
                ...state,
                callState: LoadingState.INIT,
            };
        }
        return state
    })
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
