import { Component, OnInit } from '@angular/core'
import { QueryRef } from 'apollo-angular'
import { map, Observable } from 'rxjs'
import { LaunchesUpcomingGQL, LaunchesUpcomingQuery } from 'src/generated/spacex-graphql'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    launchesUpcoming$: Observable<LaunchesUpcomingQuery['launchesUpcoming']>
    queryRef: QueryRef<LaunchesUpcomingQuery>

    constructor(private readonly launchesUpcomingGQL: LaunchesUpcomingGQL) {}
    
    ngOnInit() {
        this.queryRef = this.launchesUpcomingGQL.watch()
        this.launchesUpcoming$ = this.queryRef.valueChanges.pipe(
            map((result) => result.data.launchesUpcoming)
        )
    }
}
