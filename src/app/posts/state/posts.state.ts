import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "src/app/model/post.model";

export interface PostsState extends EntityState<Post> {
    // posts: Array<Post>
}

export const postsAdapter = createEntityAdapter<Post>()

// export const initialState: PostsState = {
//     posts: [
//         {
//             id: '1',
//             title: 'sample title 1',
//             description: 'sample description 1'
//         },
//         {
//             id: '2',
//             title: 'sample title 2',
//             description: 'sample description 2'
//         }
//     ]
//     posts: []
// }

export const initialState: PostsState = postsAdapter.getInitialState()
    