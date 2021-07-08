import { createReducer, on } from '@ngrx/store'
import { initialState, postsAdapter } from './posts.state'
import {
    addPostSuccess,
    deletePostSuccess,
    loadPostsSuccess,
    loadPostSuccess,
    updatePostSuccess
} from './posts.actions'

const _postReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        // let post = { ...action.post };

        // return {
        //     ...state,
        //     posts: [...state.posts, post],
        // };
        return postsAdapter.addOne(action.post, state)
    }),
    on(updatePostSuccess, (state, action) => {
        // let post = { ...action.post }

        // const updatedPosts = state.posts.map(post => {
        //     return action.post.id === post.id ? action.post : post
        // })
        // return {
        //     ...state,
        //     posts: updatedPosts
        // }
        return postsAdapter.upsertOne(action.post, state)
    }),
    on(deletePostSuccess, (state, action) => {
        // const updatedPosts = state.posts.filter(post => {
        //     return post.id !== action.id
        // })
        // return {
        //     ...state,
        //     posts: updatedPosts
        // }
        return postsAdapter.removeOne(action.id, state)
    }),
    on(loadPostsSuccess, (state, action) => {
        // return {
        //     ...state,
        //     posts: [...action.posts]
        // }
        return postsAdapter.setAll(action.posts, state)
    }),
    on(loadPostSuccess, (state, action) => {
        return postsAdapter.addOne(action.post, state)
    })
)

export function postsReducer(state, action) {
    return _postReducer(state, action)
}
