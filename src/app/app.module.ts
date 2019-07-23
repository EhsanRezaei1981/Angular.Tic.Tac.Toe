import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { TicTacToeComponent } from "./tic-tac-toe/tic-tac-toe.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { TicTacToeService } from "./tic-tac-toe/tic-tac-toe.service";
@NgModule({
  declarations: [AppComponent, TicTacToeComponent],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    RouterModule.forRoot([{ path: "", component: AppComponent }])
  ],
  providers: [TicTacToeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
