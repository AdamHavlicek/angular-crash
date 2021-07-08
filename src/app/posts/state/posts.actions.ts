import { createAction, props } from '@ngrx/store'
import { Post } from 'src/app/model/post.model'

export enum PostsActions {
    ADD_POST_START = '[posts page] add post start',
    ADD_POST_SUCCESS = '[posts page] add post success',
    UPDATE_POST_START = '[posts page] update post start',
    UPDATE_POST_SUCCESS = '[posts page] update post success',
    DELETE_POST_START = '[posts page] delete post start',
    DELETE_POST_SUCCESS = '[posts page] delete post success',
    LOAD_POSTS_START = '[posts page] load posts start',
    LOAD_POSTS_SUCCESS = '[posts page] load posts success',
    LOAD_POST_START = '[posts page] load single post start',
    LOAD_POST_SUCCESS = '[posts page] load single post start'
}

export const addPostStart = createAction(
    PostsActions.ADD_POST_START,
    props<{ post: Post }>()
)
export const addPostSuccess = createAction(
    PostsActions.ADD_POST_SUCCESS,
    props<{ post: Post }>()
)
export const updatePost = createAction(
    PostsActions.UPDATE_POST_START,
    props<{ post: Post }>()
)
export const updatePostSuccess = createAction(
    PostsActions.UPDATE_POST_SUCCESS,
    props<{ post: Post }>()
)
export const deletePost = createAction(
    PostsActions.DELETE_POST_START,
    props<{ id: string }>()
)
export const deletePostSuccess = createAction(
    PostsActions.DELETE_POST_SUCCESS,
    props<{ id: string }>()
)

export const loadPosts = createAction(PostsActions.LOAD_POSTS_START)
export const loadPostsSuccess = createAction(
    PostsActions.LOAD_POSTS_SUCCESS,
    props<{ posts: Array<Post> }>()
)
export const loadPost = createAction(
    PostsActions.LOAD_POST_START,
    props<{ id: string }>()
)
export const loadPostSuccess = createAction(
    PostsActions.LOAD_POST_SUCCESS,
    props<{ post: Post }>()
)
