import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Post } from 'src/app/model/post.model'
import { AppState } from 'src/app/store/app.state'
import { getPostById } from '../state/posts.selector'

@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.sass']
})
export class SinglePostComponent implements OnInit {
    post$: Observable<Post>
    route$: Observable<any>

    constructor(
        private readonly store: Store<AppState>,
    ) {}

    ngOnInit(): void {
        this.post$ = this.store.select(getPostById)
    }
}
