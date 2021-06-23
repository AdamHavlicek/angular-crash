import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signupStart } from '../state/auth.actions';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.signUpForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required])
        });
    }

    onSubmit(): void {
      if (!this.signUpForm.valid) {
        return
      }
      const email = this.signUpForm.value.email
      const password = this.signUpForm.value.password

      this.store.dispatch(signupStart({email, password}))
    }

}
