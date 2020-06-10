import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {CommentPost} from '../../../shared/interfaces';
import {CommentsService} from '../../../shared/comments.service';

@Injectable({
  providedIn: "root",
})
export class CommentsResolver implements Resolve<CommentPost[]>{
  constructor(private commentsService: CommentsService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<CommentPost[]> {
    return this.commentsService.getAll();
  }

}
