import { Component, OnInit } from '@angular/core'
import { CounterStore } from '../state/counter.store'

@Component({
    selector: 'app-counter-buttons',
    templateUrl: './counter-buttons.component.html',
    styleUrls: ['./counter-buttons.component.sass']
})
export class CounterButtonsComponent {
    constructor(private readonly counterStore: CounterStore) {}

    onIncrement(): void {
        this.counterStore.increment()
        // this.store.dispatch(increment())
    }

    onDecrement(): void {
        this.counterStore.decrement()
        // this.store.dispatch(decrement())
    }

    onReset(): void {
        this.counterStore.reset()
        // this.store.dispatch(reset())
    }
}
