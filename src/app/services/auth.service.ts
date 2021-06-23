import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { autoLogout } from '../auth/state/auth.actions';
import { AuthResponseData } from '../model/auth-response-data.model';
import { User } from '../model/user.model';
import { AppState } from '../store/app.state';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    timeoutInterval: any;
    constructor(
        private readonly httpClient: HttpClient,
        private readonly store: Store<AppState>
    ) {}

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.httpClient.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );
    }

    signup(email: string, password: string): Observable<AuthResponseData> {
        return this.httpClient.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );
    }

    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(
            new Date().getTime() + Number(data.expiresIn) * 1000
        );
        return new User(data.email, data.idToken, data.localId, expirationDate);
    }

    getErrorMessage(message: string) {
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                return 'Email not found';
            case 'INVALID_PASSWORD':
                return 'Invalid password';
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return 'Try later. Too many attempts';
            default:
                return 'Unknown error occurred. Please try again.';
        }
    }

    setUserToLocalStorage(user: User): void {
        localStorage.setItem('userData', JSON.stringify(user));

        this.runTimeoutInterval(user);
    }

    runTimeoutInterval(user: User): void {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;

        this.timeoutInterval = setTimeout(() => {
            this.store.dispatch(autoLogout())
            //Logout functionality or get the refresh token
        }, timeInterval);
    }

    getUserFromLocalStorage(): User {
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const user = new User(
                userData.email,
                userData.token,
                userData.localId,
                new Date(userData.expirationDate)
            );
            this.runTimeoutInterval(user);

            return user;
        }

        return null;
    }

    logout(): void {
        localStorage.removeItem('userData');

        if (this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }
}
