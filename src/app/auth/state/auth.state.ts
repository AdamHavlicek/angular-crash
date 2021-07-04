import { User } from 'src/app/model/user.model';


export enum LoadingState {
    INIT = 'INIT',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
}
export interface ErrorState {
    errorMessage: string
}

export type CallState = LoadingState | ErrorState;

export function getError(callState: CallState): string | null {
    if ((callState as ErrorState).errorMessage !== undefined) {
        return (callState as ErrorState).errorMessage
    }
    return null
}

export interface ResultState<T> {
    result: T;
    callState: CallState
    // isLoading: boolean,
    // isLoaded: boolean
    // errorMessage: string | null
}
export interface AuthState {
    user: User | null;
    callState: CallState;
    
    // isLoaded: boolean
    // isLoading: boolean
    // errorMessage: string | null
}

export const initialState: AuthState = {
    user: null,
    callState: LoadingState.INIT,
    // isLoading: false,
    // isLoaded: false,
    // errorMessage: null
};
