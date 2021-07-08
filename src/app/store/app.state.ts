import { routerReducer, RouterReducerState } from '@ngrx/router-store'
import { authReducer } from '../auth/state/auth.reducer'
import { AuthState } from '../auth/state/auth.state'
import { sharedReducer } from './shared/shared.reducer'
import { SharedState } from './shared/shared.state'

export enum StateNames {
    ROUTER_STATE_NAME = 'router',
    POSTS_STATE_NAME = 'posts',
    AUTH_STATE_NAME = 'auth',
    SHARED_STATE_NAME = 'shared'
}
export interface AppState {
    [StateNames.SHARED_STATE_NAME]: SharedState
    [StateNames.AUTH_STATE_NAME]: AuthState
    [StateNames.ROUTER_STATE_NAME]: RouterReducerState
}

export const appReducer = {
    [StateNames.SHARED_STATE_NAME]: sharedReducer,
    [StateNames.AUTH_STATE_NAME]: authReducer,
    [StateNames.ROUTER_STATE_NAME]: routerReducer
}
