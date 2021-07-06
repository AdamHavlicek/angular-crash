import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterStore } from '../state/counter.store';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.sass']
})
export class CustomCounterInputComponent implements OnInit {

  value: number
  channelName$: Observable<string>

  constructor(
    private readonly counterStore: CounterStore
    ) { }

  ngOnInit(): void {

    // this.channelName$ = this.store.select(getChannelName)
    this.channelName$ = this.counterStore.getChannelName
  }

  onAdd(): void {
    // this.store.dispatch(customIncrement({value: !!this.value ? +this.value : 0}))
    this.counterStore.customIncrement(!!this.value ? Number(this.value) : 0)
  }
  
  onChangeChannelName(): void {
    // this.store.dispatch(changeChannelName())
    this.counterStore.changeChannelName()
  }

}
