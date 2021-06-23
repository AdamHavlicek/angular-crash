import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from './posts.actions';

const _postReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        let post = { ...action.post };

        return {
            ...state,
            posts: [...state.posts, post],
        };
    }),
    on(updatePostSuccess, (state, action) => {
        let post = { ...action.post }

        const updatedPosts = state.posts.map(post => {
            return action.post.id === post.id ? action.post : post
        })
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(deletePostSuccess, (state, action) => {
        const updatedPosts = state.posts.filter(post => {
            return post.id !== action.id
        })
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })

);

export function postsReducer(state, action) {
    return _postReducer(state, action);
}
