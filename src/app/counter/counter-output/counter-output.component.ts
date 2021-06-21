import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.sass']
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter$: Observable<number>

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {

    this.counter$ = this.store.select(getCounter)
  }

  ngOnDestroy(): void {
  }

}
