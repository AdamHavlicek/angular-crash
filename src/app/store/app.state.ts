import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { authReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selectors";
import { AuthState } from "../auth/state/auth.state";
import { sharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export const ROUTER_STATE_NAME = 'router'
export interface AppState {
    [SHARED_STATE_NAME]: SharedState
    [AUTH_STATE_NAME]: AuthState,
    [ROUTER_STATE_NAME]: RouterReducerState
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
    [AUTH_STATE_NAME]: authReducer,
    [ROUTER_STATE_NAME]: routerReducer
}