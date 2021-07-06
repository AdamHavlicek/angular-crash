import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/model/user.model'
import { ResultState } from './auth.state'

export enum AUTH_ACTIONS {
    AUTO_LOGIN_ACTION = '[auth page] auto login',
    LOGOUT_ACTION = '[auth page] logout',
    RESET_CALLSTATE = '[auth page] reset callState',
    LOGIN_START = '[auth page] login start',
    LOGIN_SUCCESS = '[auth page] login success',
    LOGIN_FAILURE = '[auth page] login failure',

    SIGNUP_START = '[auth page] sign-up start',
    SIGNUP_SUCCESS = '[auth page] sign-up success',
    SIGNUP_FAILURE = '[auth page] sign-up failure'
}

export const loginStart = createAction(
    AUTH_ACTIONS.LOGIN_START,
    props<
        ResultState<{
            email: string
            password: string
        }>
    >()
)
export const loginSuccess = createAction(
    AUTH_ACTIONS.LOGIN_SUCCESS,
    props<ResultState<{ user: User; redirect: boolean }>>()
)

export const loginFailure = createAction(
    AUTH_ACTIONS.LOGIN_FAILURE,
    props<ResultState<null>>()
)

export const signUpStart = createAction(
    AUTH_ACTIONS.SIGNUP_START,
    props<ResultState<{ email: string; password: string }>>()
)
export const signUpSuccess = createAction(
    AUTH_ACTIONS.SIGNUP_SUCCESS,
    props<ResultState<{ user: User; redirect: boolean }>>()
)
export const signUpFailure = createAction(
    AUTH_ACTIONS.SIGNUP_FAILURE,
    props<ResultState<{ reason: string }>>()
)

export const autoLogin = createAction(AUTH_ACTIONS.AUTO_LOGIN_ACTION)
export const autoLogout = createAction(AUTH_ACTIONS.LOGOUT_ACTION)
export const resetCallState = createAction(AUTH_ACTIONS.RESET_CALLSTATE)
