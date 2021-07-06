import { createAction, props } from '@ngrx/store'
import { Post } from 'src/app/model/post.model'

export enum POSTS_ACTIONS {
    ADD_POST_START = '[posts page] add post start',
    ADD_POST_SUCCESS = '[posts page] add post success',
    UPDATE_POST_START = '[posts page] update post start',
    UPDATE_POST_SUCCESS = '[posts page] update post success',
    DELETE_POST_START = '[posts page] delete post start',
    DELETE_POST_SUCCESS = '[posts page] delete post success',
    LOAD_POSTS = '[posts page] load posts',
    LOAD_POSTS_SUCCESS = '[posts page] load posts success'
}

export const addPostStart = createAction(
    POSTS_ACTIONS.ADD_POST_START,
    props<{ post: Post }>()
)
export const addPostSuccess = createAction(
    POSTS_ACTIONS.ADD_POST_SUCCESS,
    props<{ post: Post }>()
)
export const updatePost = createAction(
    POSTS_ACTIONS.UPDATE_POST_START,
    props<{ post: Post }>()
)
export const updatePostSuccess = createAction(
    POSTS_ACTIONS.UPDATE_POST_SUCCESS,
    props<{ post: Post }>()
)
export const deletePost = createAction(
    POSTS_ACTIONS.DELETE_POST_START,
    props<{ id: string }>()
)
export const deletePostSuccess = createAction(
    POSTS_ACTIONS.DELETE_POST_SUCCESS,
    props<{ id: string }>()
)

export const loadPosts = createAction(POSTS_ACTIONS.LOAD_POSTS)
export const loadPostsSuccess = createAction(
    POSTS_ACTIONS.LOAD_POSTS_SUCCESS,
    props<{ posts: Array<Post> }>()
)
