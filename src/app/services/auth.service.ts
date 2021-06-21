import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../model/auth-response-data.model';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private readonly httpClient: HttpClient) {
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.httpClient.post<AuthResponseData>(
           `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
           {
               email,
               password,
               returnSecureToken: true
           } 
        )

    }

    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(new Date().getDate() + +data.expiresIn * 1000)
        return new User(data.email, data.idToken, data.localId, expirationDate)
    }

    getErrorMessage(message: string) {
      switch(message) {
        case 'EMAIL_NOT_FOUND': 
          return 'Email not found'
        case 'INVALID_PASSWORD':
          return 'Invalid password'
        default:
          return 'Unknown error occurred. Please try again.'
      }
    }
}
