import { Component, OnInit } from '@angular/core'
import { QueryRef } from 'apollo-angular'
import { map, Observable } from 'rxjs'
import {
    LaunchesUpcomingQuery,
    LaunchesUpcomingQueryService
} from 'src/generated/spacex-graphql'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    launchesUpcoming$: Observable<LaunchesUpcomingQuery['launchesUpcoming']>
    queryRef: QueryRef<LaunchesUpcomingQuery>

    constructor(
        private readonly launchesUpcomingQueryService: LaunchesUpcomingQueryService
    ) {}

    ngOnInit() {
        this.queryRef = this.launchesUpcomingQueryService.watch()
        this.launchesUpcoming$ = this.queryRef.valueChanges.pipe(
            map((result) => result.data.launchesUpcoming)
        )
    }
}
