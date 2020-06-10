import {Component, OnDestroy, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {PostsService} from '../shared/posts.service';
import {Post} from '../shared/interfaces';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: Post[];
  getAllSubscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getAllSubscription = this.postsService.getAll()
      .pipe(
        map((posts: Post[]) => {
          return posts.reverse();
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      })
  }

  ngOnDestroy(): void {
    if(this.getAllSubscription) {
      this.getAllSubscription.unsubscribe();
    }
  }

}
