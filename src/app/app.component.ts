import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { autoLogin } from './auth/state/auth.actions'
import { AppState } from './store/app.state'
import { RouterStateUrl } from './store/router/custom-serializer'
import { getCurrentRoute, getRouterState } from './store/router/router.selector'
// import { getErrorMessage, getLoading } from './store/shared/shared.selector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'angular-crash'
    route$: Observable<RouterStateUrl>

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        // this.showLoading = this.store.select(getLoading)
        // this.errorMessage = this.store.select(getErrorMessage)
        this.route$ = this.store.select(getCurrentRoute)

        this.store.dispatch(autoLogin())
    }
}
