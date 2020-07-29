import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { AuthEffects } from './store/effects/Auth/auth.effects';
import { AuthService } from '../app/services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import {HelperModule} from './helpers/helper.module';
import { ErrorHandler } from './helpers/error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HelperModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthService, ErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }

