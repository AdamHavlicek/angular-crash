import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import {
    addPostStart,
    addPostSuccess,
    deletePost,
    deletePostSuccess,
    loadPosts,
    loadPostsSuccess,
    updatePost,
    updatePostSuccess,
} from './posts.actions';

@Injectable()
export class PostsEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly postsService: PostsService,
        private readonly store: Store<AppState>,
        private readonly router: Router
    ) {}

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postsService.getPosts().pipe(
                    map((data) => {
                        return loadPostsSuccess({ posts: data });
                    })
                );
            })
        );
    });

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPostStart),
            mergeMap((action) => {
                return this.postsService.addPost(action.post).pipe(
                    map((post) => {
                        return addPostSuccess({ post: action.post });
                    })
                );
            })
        );
    });

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postsService.updatePost(action.post).pipe(
                    map((data) => {
                        return updatePostSuccess({ post: action.post });
                    })
                );
            })
        );
    });

    redirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePostSuccess),
            tap((action) => {
                this.router.navigate(['posts'])
            })
        )
    }, {dispatch: false})

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postsService.deletePost(action.id).pipe(
                    map((data) => {
                        return deletePostSuccess({ id: action.id });
                    })
                );
            })
        );
    });
}
