import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.sass']
})
export class LoadingSpinnerComponent {
    @Input() showSpinner: Observable<boolean>

    constructor() {}
}
