import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialExampleModule } from "src/material.module";
import { SiderModule } from "../siders/sider.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutRoutes } from "./layout.routing";
import { NotificationComponent } from "./notification/notification.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
// import { GtagModule } from 'angular-gtag';
@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(LayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialExampleModule
    ],
    declarations:[
        DashboardComponent,
        UserProfileComponent,
        TodoListComponent,
        NotificationComponent
    ]
})
export class LayoutModule {}