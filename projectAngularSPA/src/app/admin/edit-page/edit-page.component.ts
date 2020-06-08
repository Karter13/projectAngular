import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  updateSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id'])
        })
      ).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
    })
  }

  get title() {
    return this.form.get('title');
  }

  get text() {
    return this.form.get('text');
  }

  submit() {
    if (this.form.invalid) {
      return false;
    }

    this.submitted = true;

    this.updateSubscription = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.warning('Пост обновлён!');
    })
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
