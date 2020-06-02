import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CommentPost} from './interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  create(comment: CommentPost): Observable<CommentPost> {
    return this.http.post(`${environment.fbDbUrl}/comments.json`, comment)
      .pipe(
        map(() => {
          return {
            ...comment,
            date: new Date(comment.date),
          }
        }),
      );
  }

  getAll(): Observable<CommentPost[]> {
    return this.http.get(`${environment.fbDbUrl}/comments.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object
            .keys(response)
            .map(key =>({
              ...response[key],
              date: new Date(response[key].date)
            }))
        })
      )
  }
}
