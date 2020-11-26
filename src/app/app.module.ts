import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BallComponent } from './components/ball/ball.component';
import { ApiService } from './services/api.service';
import { ColrInterceptor } from './services/colr.interceptor';
import { StateService } from './services/state.service';
import { StoreService } from './services/store.service';
import { UiControlService } from './services/uiControl.service';
import { BallResolver } from './components/ball/ball.resolver';

@NgModule({
  declarations: [
    AppComponent,
    BallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    StateService,
    StoreService,
    BallResolver,
    UiControlService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ColrInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
