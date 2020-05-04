import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass']
})
export class AdminLayoutComponent implements OnInit {
  collapsed: any = 'false'

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(event: Event) {
    event.preventDefault();
    this.router.navigate(['/admin', 'login']);
  }
}
