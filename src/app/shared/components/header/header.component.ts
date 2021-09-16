import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { autoLogout } from 'src/app/auth/state/auth.actions'
import { isAuthenticated } from 'src/app/auth/state/auth.selectors'
import { AppState } from 'src/app/store/app.state'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    isAuthenticated$: Observable<boolean>

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.isAuthenticated$ = this.store.select(isAuthenticated)
    }

    onLogout(): void {
        this.store.dispatch(autoLogout())
    }
}
