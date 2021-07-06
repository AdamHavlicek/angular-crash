import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CounterState } from './counter.state';

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
    constructor() {
        super();
    }

    readonly getCounter = this.select(state => state.counter)

    readonly getChannelName = this.select(state => state.channelName)

    readonly increment = this.updater((state: CounterState) => {
        return {
            ...state,
            counter: state.counter + 1,
        };
    });

    readonly decrement = this.updater((state) => ({
        ...state,
        counter: state.counter - 1,
    }));

    readonly reset = this.updater((state) => ({
        ...state,
        counter: 0,
    }));

    readonly customIncrement = this.updater((state, value: number) => ({
        ...state,
        counter: Number(value),
    }));

    readonly changeChannelName = this.updater(state => ({
        ...state,
        channelName: 'Modified web app name'
    }))
}
