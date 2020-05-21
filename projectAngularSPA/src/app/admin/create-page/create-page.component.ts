import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.sass']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
    })
  }

  get title() {
    return this.form.get('title');
  }

  get author() {
    return this.form.get('author');
  }

  get text() {
    return this.form.get('text');
  }

  submit() {
    if(this.form.invalid) {
      return false;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date(),
    }

    console.log(post);
  }
}
