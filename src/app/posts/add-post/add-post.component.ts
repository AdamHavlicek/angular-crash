import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Post } from 'src/app/model/post.model'
import { AppState } from 'src/app/store/app.state'
import { addPostStart } from '../state/posts.actions'

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.sass']
})
export class AddPostComponent implements OnInit {
    postForm: FormGroup

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.postForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(10)
            ])
        })
    }

    showDescriptionsErrors(): string {
        const descriptionForm = this.postForm.get('description')
        if (descriptionForm.touched && !descriptionForm.valid) {
            if (descriptionForm.errors.required) {
                return 'Description is required'
            }

            if (descriptionForm.errors.minLength) {
                return 'Description must be more than 10 characters'
            }
        }
        return ''
    }

    onAddPost(): void {
        if (!this.postForm.valid) {
            return
        }

        const post: Post = {
            title: this.postForm.value.title,
            description: this.postForm.value.description
        }

        this.store.dispatch(addPostStart({ post }))
    }
}
