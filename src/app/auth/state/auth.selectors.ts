import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState, getError, LoadingState } from './auth.state'

export const AUTH_STATE_NAME = 'auth'

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME)

export const isAuthenticated = createSelector(getAuthState, (state) => {
    return !!state.user
})

export const getToken = createSelector(getAuthState, (state) => {
    return state.user?.userToken
})

export const getCallState = createSelector(getAuthState, (state) => {
    return state.callState === LoadingState.LOADING
})

export const getErrorMessage = createSelector(getAuthState, (state) => {
    return getError(state.callState)
})
