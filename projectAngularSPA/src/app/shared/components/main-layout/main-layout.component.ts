import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  connectAd() {
    this.router.navigate(['/admin', 'dashboard']);
  }

  connectAbout() {
    this.router.navigate(['/about']);
  }
}
