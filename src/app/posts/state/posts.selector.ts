import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./post.state";

export const POSTS_STATE_NAME = 'posts'
const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME)

export const getPosts = createSelector(getPostsState, (state) => {
    return state.posts
})

export const getPostById = (postId: string) => createSelector(getPostsState, (state) => {
    return state.posts.find(post => post.id === postId)
})