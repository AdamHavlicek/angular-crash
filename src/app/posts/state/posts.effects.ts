import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import {
    filter,
    map,
    mergeMap,
    switchMap,
    withLatestFrom
} from 'rxjs/operators'
import { Post } from 'src/app/model/post.model'
import { PostsService } from 'src/app/services/posts.service'
import { AppState } from 'src/app/store/app.state'
import {
    addPostStart,
    addPostSuccess,
    deletePost,
    deletePostSuccess,
    loadPosts,
    loadPostsSuccess,
    updatePost,
    updatePostSuccess
} from './posts.actions'
import { getPostsEntities } from './posts.selector'

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
                        return loadPostsSuccess({ posts: data })
                    })
                )
            })
        )
    })

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPostStart),
            mergeMap((action) => {
                return this.postsService.addPost(action.post).pipe(
                    map((data) => {
                        const post = { ...action.post, id: data.name }
                        return addPostSuccess({ post })
                    })
                )
            })
        )
    })

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postsService.updatePost(action.post).pipe(
                    map((data) => {
                        const updatedPostData: Post = {
                            ...action.post,
                            id: action.post.id
                        }
                        return updatePostSuccess({ post: updatedPostData })
                    })
                )
            })
        )
    })

    // redirect$ = createEffect(
    //     () => {
    //         return this.actions$.pipe(
    //             ofType(updatePostSuccess),
    //             tap((action) => {
    //                 this.router.navigate(['posts']);
    //             })
    //         );
    //     },
    //     { dispatch: false }
    // );

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postsService.deletePost(action.id).pipe(
                    map((data) => {
                        return deletePostSuccess({ id: action.id })
                    })
                )
            })
        )
    })

    getSinglePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/posts/detail')
            }),
            map((r: RouterNavigatedAction) => {
                return r.payload.routerState['params']['id']
            }),
            withLatestFrom(this.store.select(getPostsEntities)),
            switchMap(([id, posts]) => {
                if (Object.keys(posts).length === 0) {
                    return this.postsService.getPostById(id).pipe(
                        map((post) => {
                            return updatePostSuccess({ post: { ...post, id } })
                        })
                    )
                }
                return of(
                    updatePostSuccess({
                        post: posts[id]
                    })
                )
            })
        )
    })
}
