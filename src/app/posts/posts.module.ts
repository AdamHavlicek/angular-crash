import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthGuard } from '../services/auth.guard'
import { PostsService } from '../services/posts.service'
import { AddPostComponent } from './add-post/add-post.component'
import { EditPostComponent } from './edit-post/edit-post.component'
import { PostsListComponent } from './posts-list/posts-list.component'
import { PostsEffects } from './state/posts.effects'
import { postsReducer } from './state/posts.reducer'
import { POSTS_STATE_NAME } from './state/posts.selector'
import { SinglePostComponent } from './single-post/single-post.component'
import { ConnectFormDirective } from '../shared/directives/connect-form.directive'

const routes: Routes = [
    {
        path: '',
        component: PostsListComponent,
        children: [
            {
                path: 'add',
                component: AddPostComponent
            },
            {
                path: 'edit/:id',
                component: EditPostComponent
            }
        ]
    }
]

@NgModule({
    declarations: [
        PostsListComponent,
        AddPostComponent,
        EditPostComponent,
        SinglePostComponent,
        ConnectFormDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POSTS_STATE_NAME, postsReducer),
        ReactiveFormsModule,
        EffectsModule.forFeature([PostsEffects])
    ],
    providers: [PostsService]
})
export class PostsModule {}
