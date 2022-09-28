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
import { TokenInterceptorService } from './componenets/services/interceptors/token-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './componenets/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiderModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialExampleModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
