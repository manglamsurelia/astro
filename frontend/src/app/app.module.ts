import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './componenets/dashboard/layout.module';
import { LayoutComponent } from './componenets/dashboard/layout/layout.component';
import { SiderModule } from './componenets/siders/sider.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componenets/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialExampleModule } from 'src/material.module';
import { AuthGuardService } from './componenets/services/auth-guard.service';
import { TokenInterceptorService } from './componenets/services/interceptors/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiderModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialExampleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
