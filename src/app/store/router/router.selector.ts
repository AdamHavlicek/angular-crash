import { RouterReducerState } from "@ngrx/router-store";
import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { ROUTER_STATE_NAME } from "../app.state";
import { RouterStateUrl } from "./custom-serializer";

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTER_STATE_NAME)

export const getCurrentRoute = createSelector(getRouterState, router => {
    return router.state
})