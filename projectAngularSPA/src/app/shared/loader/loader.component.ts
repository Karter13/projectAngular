import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoaderService} from "./loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoader = false;

  isLoaderSubscription: Subscription;
  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.isLoaderSubscription = this.loaderService.getLoaderStatus()
      .subscribe((status: boolean) => {
        this.isLoader = status;
      })
  }

  ngOnDestroy(): void {
    this.isLoaderSubscription.unsubscribe();
  }

}
