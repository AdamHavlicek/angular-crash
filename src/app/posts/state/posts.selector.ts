import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import {
    getCurrentRoute,
} from 'src/app/store/router/router.selector';
import { postsAdapter, PostsState } from './posts.state';

export const POSTS_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const postsSelectors = postsAdapter.getSelectors();

// export const getPosts = createSelector(getPostsState, (state) => {
//     return state.posts
// })
export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostsEntities = createSelector(
    getPostsState,
    postsSelectors.selectEntities
);

// export const getPostById = (postId: string) => createSelector(getPostsState, (state) => {
//     return state.posts.find(post => post.id === postId)
// })
// export const getPostById = createSelector(getPosts, getCurrentRoute, (posts, route) => {
//     return posts ? posts.find(post => post.id === route.params.id) : null
// })

export const getPostById = createSelector(
    getPostsEntities,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
        return posts[route.params.id]
    }
);

// export const getMaxPostId = () => createSelector(getPostsState,  (state) => {
//     return Math.max.apply(Math, state.posts.map(element => element.id))
// })
