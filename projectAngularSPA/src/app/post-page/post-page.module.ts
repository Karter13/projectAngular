import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {PostPageComponent} from "./post-page.component";
import {PostPageRoutingModule} from "./post-page-routing.module";

@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PostPageRoutingModule
  ]
})
export class PostPageModule {

}
