import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CommentPost} from '../../shared/interfaces';
import {pipe, Subscription} from 'rxjs';
import {CommentsService} from '../../shared/comments.service';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.sass']
})
export class CommentsPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id: string;
  comments: CommentPost[]= [];
  submitted = false;
  createSubscription: Subscription;
  getSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => {
        this.id = params['id'];
      });

    this.getSubscription = this.commentsService.getAll()
      .pipe(
        map((comments: CommentPost[]) => {
          return comments.reverse();
        })
      )
      .subscribe(comments => {
      this.comments = comments.filter(comment => comment.id === this.id);
    });

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    })
  }

  get text() {
    return this.form.get('text');
  }

  get name() {
    return this.form.get('name');
  }

  submit() {
    if (this.form.invalid) {
      return false;
    }
    this.submitted = true;

    const comment: CommentPost = {
      id: this.id,
      name: this.form.value.name,
      text: this.form.value.text,
      date: new Date(),
    };

    console.log(comment);

    this.createSubscription = this.commentsService.create(comment).subscribe(() => {
      this.submitted = false;
      this.form.reset();
      this.comments.unshift(comment);
    });

  }

  ngOnDestroy(): void {

    if(this.createSubscription) {
      this.createSubscription.unsubscribe();
    }

    if(this.getSubscription) {
      this.getSubscription.unsubscribe();
    }

  }

}
