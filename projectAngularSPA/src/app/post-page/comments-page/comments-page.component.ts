import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.sass']
})
export class CommentsPageComponent implements OnInit {
  form: FormGroup;
  id: string;

  constructor(
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    })
  }

  get text() {
    return this.form.get('text');
  }

  get name() {
    return this.form.get('name');
  }

  submit() {
    if (this.form.invalid) {

      return false;
    }
    console.log(this.form);
  }
}
