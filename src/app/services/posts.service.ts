import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../model/post.model';
import { AppState } from '../store/app.state';

@Injectable()
export class PostsService {
    constructor(
        private readonly store: Store<AppState>,
        private readonly httpClient: HttpClient
    ) {}

    getPosts(): Observable<Array<Post>> {
        return this.httpClient
            .get<Array<Post>>(
                'https://angular-30159-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
            )
            .pipe(
                map((data) => {
                    const posts: Post[] = [];
                    for (let key in data) {
                        posts.push({ ...data[key], id: key });
                    }
                    return posts;
                })
            );
    }

    addPost(post: Post): Observable<{ name: string }> {
        return this.httpClient.post<{ name: string }>(
            `https://angular-30159-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
            post
        );
    }

    updatePost(post: Post) {
        const postData = {
            [post.id]: {
                title: post.title,
                description: post.description,
            },
        };
        return this.httpClient.patch<{ name: string }>(
            `https://angular-30159-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
            postData
        );
    }

    deletePost(id: string) {
        return this.httpClient.delete<{ name: string }>(
            `https://angular-30159-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
        );
    }
}
