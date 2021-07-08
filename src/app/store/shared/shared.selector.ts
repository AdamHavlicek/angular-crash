import { createFeatureSelector, createSelector } from '@ngrx/store'
import { StateNames } from '../app.state'
import { SharedState } from './shared.state'

const getSharedState = createFeatureSelector<SharedState>(
    StateNames.SHARED_STATE_NAME
)

// export const getLoading = createSelector(getSharedState, (state) => {
//     return state.showLoading
// })

// export const getErrorMessage = createSelector(getSharedState, (state) => {
//     return state.errorMessage
// })
