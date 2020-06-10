import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import ruLocaleData from '@angular/common/locales/ru';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostComponent } from './shared/components/post/post.component';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/auth.interceptor';
import {PostPageComponent} from './post-page/post-page.component';
import { CommentsPageComponent } from './post-page/comments-page/comments-page.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import { AboutPageComponent } from './home-page/about-page/about-page.component';
import {GoTopDirective} from './shared/go-top.directive';
import {DotPipe} from './shared/dot.pipe';
import {LoaderComponent} from './shared/loader/loader.component';
import {LoaderInterceptor} from './shared/loader/loader.interceptor';

registerLocaleData(ruLocaleData, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    CommentsPageComponent,
    ErrorPageComponent,
    DotPipe,
    AboutPageComponent,
    GoTopDirective,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
