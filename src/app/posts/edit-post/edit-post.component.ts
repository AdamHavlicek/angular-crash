import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost, UPDATE_POST_START } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.sass'],
})
export class EditPostComponent implements OnInit, OnDestroy {
    post: Post;
    postForm: FormGroup;
    postSubscription: Subscription;

    constructor(
        private readonly store: Store<AppState>,
    ) {}

    ngOnInit(): void {
        this.createForm()
        this.postSubscription = this.store.select(getPostById).subscribe((post) => {
            if (!!!post) {
                return
            }
            this.post = post
            this.postForm.patchValue({
                title: post.title,
                description: post.description
            })
        })
        // this.route.paramMap.subscribe((params) => {
        //     const id = params.get('id');
        //     this.store.select(getPostById(id)).subscribe((data) => {
        //         this.post = data;
        //         this.createForm();
        //     });
        // });
    }

    ngOnDestroy(): void {
        if (this.postSubscription) {
            this.postSubscription.unsubscribe();
        }
    }

    onSubmit(): void {
        if (!this.postForm.valid) {
            return;
        }

        const post: Post = {
            ...this.post,
            title: this.postForm.value.title,
            description: this.postForm.value.description,
        };

        this.store.dispatch(updatePost({ post }));
        // this.router.navigate(['posts']);
    }

    createForm(): void {
        this.postForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(10),
            ]),
        });
    }
}
