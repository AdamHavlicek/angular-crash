import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { isAuthenticated } from '../auth/state/auth.selectors';
import { AppState } from '../store/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
    constructor(
        private readonly store: Store<AppState>,
        private readonly router: Router
    ) {}
    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
            return this.getIsUserAuthenticated()
        }

    getIsUserAuthenticated() {
        return this.store.select(isAuthenticated).pipe(
            map((authenticate) => {
                if (!authenticate) {
                    return this.router.createUrlTree(['auth']);
                } else {
                    return authenticate;
                }
            })
        );
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.getIsUserAuthenticated();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.getIsUserAuthenticated();
    }
}
