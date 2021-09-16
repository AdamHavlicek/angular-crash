import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ComponentStore } from '@ngrx/component-store'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { AppState } from 'src/app/store/app.state'
import { loginStart, resetCallState } from '../state/auth.actions'
import { getCallState, getErrorMessage } from '../state/auth.selectors'
import { LoadingState } from '../state/auth.state'
import { LoginState, LoginStore } from './login.component.store'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
    providers: [LoginStore]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup
    showLoadingSpinner$: Observable<boolean>
    errorMessage$: Observable<string | null>

    constructor(
        private readonly store: Store<AppState>,
        private readonly loginStore: LoginStore
    ) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })

        this.showLoadingSpinner$ = this.store.select(getCallState)
        this.errorMessage$ = this.store.select(getErrorMessage)

        this.store.dispatch(resetCallState())

        // this.showLoadingSpinner$ = this.loginStore.getCallState$
        // this.errorMessage$ = this.loginStore.getErrorMessage$
    }

    onSubmit(): void {
        if (!this.loginForm.valid) {
            return
        }

        const email = this.loginForm.value.email
        const password = this.loginForm.value.password

        this.store.dispatch(
            loginStart({
                result: { email, password },
                callState: LoadingState.LOADING
                // isLoading: true,
                // isLoaded: false,
                // errorMessage: null,
            })
        )
        // this.loginStore.login({email, password})
    }
}
