import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { distinctUntilChanged, exhaustMap, map, tap } from 'rxjs/operators'
import { Post } from 'src/app/model/post.model'
import { AppState } from 'src/app/store/app.state'
import { updatePost } from '../state/posts.actions'
import { getPostById } from '../state/posts.selector'

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.sass'],
})
export class EditPostComponent implements OnInit {
    post$: Observable<Post>
    postForm: FormGroup

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.createForm()
        this.post$ = this.store
            .select(getPostById)
        // this.route.paramMap.subscribe((params) => {
        //     const id = params.get('id');
        //     this.store.select(getPostById(id)).subscribe((data) => {
        //         this.post = data;
        //         this.createForm();
        //     });
        // });
    }

    onSubmit(): void {
        if (!this.postForm.valid) {
            return
        }

        const post: Post = {
            title: this.postForm.value.title,
            description: this.postForm.value.description
        }

        this.store.dispatch(updatePost({ post }))
        // this.router.navigate(['posts']);
    }

    createForm(): void {
        this.postForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(10)
            ])
        })
    }
}
