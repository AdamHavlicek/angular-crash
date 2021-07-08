import { createFeatureSelector, createSelector } from '@ngrx/store'
import { StateNames } from 'src/app/store/app.state'
import { AuthState, getError, LoadingState } from './auth.state'


const getAuthState = createFeatureSelector<AuthState>(StateNames.AUTH_STATE_NAME)

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
