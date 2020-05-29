import {Component, OnDestroy, OnInit} from "@angular/core";
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;
  removeSubscription: Subscription;
  searchString = '';

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
   this.postsSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.removeSubscription = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id );
      this.alertService.warning('Пост удален!');
    })
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }

}
