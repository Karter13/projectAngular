import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../admin/shared/services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  authenticated = false;

  constructor(
    public router: Router,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  connectAd() {
    this.router.navigate(['/admin', 'dashboard']);
  }

  connectAbout() {
    this.router.navigate(['/about']);
  }

  logOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login'])
  }

}
