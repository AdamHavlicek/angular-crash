import { createReducer, on } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoading: action.showSpinner,
        };
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
        }
    })
);

export function sharedReducer(state, action) {
    return _sharedReducer(state, action);
}
