import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { resetCallState, signUpStart } from '../state/auth.actions';
import { getCallState, getErrorMessage } from '../state/auth.selectors';
import { LoadingState } from '../state/auth.state';
// import { LoadingState } from '../state/auth.state';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;
    showLoadingSpinner$: Observable<boolean>;
    errorMessage$: Observable<string | null>;

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.signUpForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
        this.showLoadingSpinner$ = this.store.select(getCallState)
        this.errorMessage$ = this.store.select(getErrorMessage)

        this.store.dispatch(resetCallState())

    }

    onSubmit(): void {
        if (!this.signUpForm.valid) {
            return;
        }
        const email = this.signUpForm.value.email;
        const password = this.signUpForm.value.password;

        this.store.dispatch(
            signUpStart({
                result: { email, password },
                callState: LoadingState.LOADING,
                // isLoaded: false,
                // isLoading: false,
                // errorMessage: null
            })
        );
    }
}
