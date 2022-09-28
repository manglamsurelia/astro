import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChangePasswordComponent } from './componenets/change-password/change-password.component';
import { DashboardComponent } from './componenets/dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './componenets/dashboard/layout/layout.component';
import { LoginComponent } from './componenets/login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', redirectTo:'dashboard',pathMatch:'full'},
  {
    path:'', component:LayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'',loadChildren: () =>import('./componenets/dashboard/layout.module').then(m=>m.LayoutModule)
      }
    ]
  },
  {path:'user/changePassword',component:ChangePasswordComponent,canActivate: [AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
