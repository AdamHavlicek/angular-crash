import { Component, OnInit } from '@angular/core'
import { CounterStore } from '../state/counter.store'

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.sass']
})
export class CounterComponent implements OnInit {
    constructor(private readonly counterStore: CounterStore) {}

    ngOnInit(): void {
        this.counterStore.setState({
            channelName: 'Test ChannelName',
            counter: 4
        })
    }
}
