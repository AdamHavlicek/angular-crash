import { Component, OnInit } from '@angular/core'
// import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
// import { AppState } from 'src/app/store/app.state'
import { CounterStore } from '../state/counter.store'

@Component({
    selector: 'app-counter-output',
    templateUrl: './counter-output.component.html',
    styleUrls: ['./counter-output.component.sass']
})
export class CounterOutputComponent implements OnInit{
    counter$: Observable<number>

    constructor(private readonly counterStore: CounterStore) {}

    ngOnInit(): void {
        // this.counter$ = this.store.select(getCounter)
        this.counter$ = this.counterStore.getCounter
    }

}
