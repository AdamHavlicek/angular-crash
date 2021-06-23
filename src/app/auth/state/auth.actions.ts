import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export const AUTO_LOGIN_ACTION = '[auth page] auto login'
export const LOGOUT_ACTION = '[auth page] logout'

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAILURE = '[auth page] login failure';

export const SIGNUP_START = '[auth page] sign-up start';
export const SIGNUP_SUCCESS = '[auth page] sign-up success';
export const SIGNUP_FAILURE = '[auth page] sign-up failure';

export const loginStart = createAction(
    LOGIN_START,
    props<{
        email: string;
        password: string;
    }>()
);
export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{ user: User, redirect: boolean }>()
);

export const loginFailure = createAction(
    LOGIN_FAILURE,
    props<{reason: string}>()
)

export const signupStart = createAction(
    SIGNUP_START,
    props<{ email: string; password: string }>()
);
export const signupSuccess = createAction(
    SIGNUP_SUCCESS,
    props<{ user: User, redirect: boolean }>()
);
export const signupFailure = createAction(
    SIGNUP_FAILURE, 
    props<{reason: string}>()
)

export const autoLogin = createAction(
    AUTO_LOGIN_ACTION
)
export const autoLogout = createAction(
    LOGOUT_ACTION
)