import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotificationComponent } from "./notification/notification.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

export const LayoutRoutes:Routes=[
{path:'dashboard', component:DashboardComponent},
{path:'user-profile', component:UserProfileComponent},
{path:'todo-list', component:TodoListComponent},
{path:'notification', component:NotificationComponent}
];