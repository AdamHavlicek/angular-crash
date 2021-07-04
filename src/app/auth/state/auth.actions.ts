import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { ResultState } from './auth.state';

export const AUTO_LOGIN_ACTION = '[auth page] auto login'
export const LOGOUT_ACTION = '[auth page] logout'
export const RESET_CALLSTATE = '[auth page] reset callState'

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAILURE = '[auth page] login failure';

export const SIGNUP_START = '[auth page] sign-up start';
export const SIGNUP_SUCCESS = '[auth page] sign-up success';
export const SIGNUP_FAILURE = '[auth page] sign-up failure';

export const loginStart = createAction(
    LOGIN_START,
    props<ResultState<{
        email: string;
        password: string;
    }>>()
);
export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<ResultState<{ user: User, redirect: boolean }>>()
);

export const loginFailure = createAction(
    LOGIN_FAILURE,
    props<ResultState<null>>()
)

export const signUpStart = createAction(
    SIGNUP_START,
    props<ResultState<{ email: string; password: string }>>()
);
export const signUpSuccess = createAction(
    SIGNUP_SUCCESS,
    props<ResultState<{ user: User, redirect: boolean }>>()
);
export const signUpFailure = createAction(
    SIGNUP_FAILURE, 
    props<ResultState<{reason: string}>>()
)

export const autoLogin = createAction(
    AUTO_LOGIN_ACTION
)
export const autoLogout = createAction(
    LOGOUT_ACTION
)
export const resetCallState = createAction(
    RESET_CALLSTATE
)