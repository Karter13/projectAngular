import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {CommentsService} from '../../shared/comments.service';
import {CommentPost} from '../../shared/interfaces';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.sass']
})
export class CommentsPageComponent implements OnInit, OnDestroy {

  id: string;
  comments: CommentPost[] = [];
  commentsSubscription: Subscription;
  submitted = false;
  error: any = null;


  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.submitted = true;
    this.error = null;
    this.route.params
      .subscribe(params => {
        this.id = params['id']
      });

    this.commentsSubscription = this.commentsService.getAll()
      .pipe(
        map((comments: CommentPost[]) => {
          return comments.reverse();
        })
      )
      .subscribe(comments => {
        this.comments = comments.filter(comment => comment.id === this.id);
          this.submitted = false;
      },
        (error) => {
          this.error = error;
      });

  }

  deleteComment(idResp: any) {
    this.commentsService.remove(idResp)
      .subscribe(() => {
        this.comments = this.comments.filter((comment: CommentPost) => comment.idResp !== idResp);
        this.alertService.warning('Комент удален!');
      })
  }

  ngOnDestroy(): void {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }


}
