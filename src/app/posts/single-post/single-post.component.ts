import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Post } from 'src/app/model/post.model'
import { AppState } from 'src/app/store/app.state'
import { RouterStateUrl } from 'src/app/store/router/custom-serializer'
import { getCurrentRoute } from 'src/app/store/router/router.selector'
import { getPostById } from '../state/posts.selector'

@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.sass']
})
export class SinglePostComponent implements OnInit {
    post$: Observable<Post>
    route$: Observable<RouterStateUrl>

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.post$ = this.store.select(getPostById)
        

        this.route$ = this.store.select(getCurrentRoute)
    }
}
