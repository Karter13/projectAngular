import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import ruLocaleData from "@angular/common/locales/ru";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { PostComponent } from "./shared/components/post/post.component";
import {SharedModule} from "./shared/shared.module";
import {AuthInterceptor} from "./shared/auth.interceptor";

registerLocaleData(ruLocaleData, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
