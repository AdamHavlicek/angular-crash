import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'counter',
        loadChildren: async () => {
            const module = await import('./counter/counter.module');
            return module.CounterModule;
        },
    },
    {
        path: 'posts',
        loadChildren: async () => {
          const module = await import('./posts/posts.module')
          return module.PostsModule
        }
    },
    {
        path: 'auth',
        loadChildren: async () => {
           const module = await import('./auth/auth.module')
           return module.AuthModule 
        }

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
