import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { decrement, increment, reset } from '../state/counter.actions';

@Component({
    selector: 'app-counter-buttons',
    templateUrl: './counter-buttons.component.html',
    styleUrls: ['./counter-buttons.component.sass'],
})
export class CounterButtonsComponent implements OnInit {
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    onIncrement(): void {
        this.store.dispatch(increment())
    }

    onDecrement(): void {
        this.store.dispatch(decrement())
    }

    onReset(): void {
        this.store.dispatch(reset())
    }
}
