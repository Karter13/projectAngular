import { Component, OnInit } from '@angular/core';

import {PostsService} from '../shared/posts.service';
import {Post} from '../shared/interfaces';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAll()
      .pipe(
        map((posts: Post[]) => {
          return posts.reverse();
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      })
  }

}
