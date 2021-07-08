import { RouterReducerState } from '@ngrx/router-store'
import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store'
import { StateNames } from '../app.state'
import { RouterStateUrl } from './custom-serializer'

export const getRouterState = createFeatureSelector<
    RouterReducerState<RouterStateUrl>
>(StateNames.ROUTER_STATE_NAME)

export const getCurrentRoute = createSelector(getRouterState, (router) => {
    return router.state
})
