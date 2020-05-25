import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;
  searchString = '';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
   this.postsSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {

  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

}
