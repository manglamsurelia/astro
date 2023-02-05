import { Routes } from "@angular/router";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { ClientTabComponent } from "./client-tab/client-tab.component";
import { CustomerComponent } from "./customer/customer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { NotificationComponent } from "./notification/notification.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { UserDataTableComponent } from "./user-data-table/user-data-table.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

export const LayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'todo-list', component: TodoListComponent },
    { path: 'notification', component: NotificationComponent },
    { path: 'client', component: ClientTabComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'user-dataTable', component: UserDataTableComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'analytics', component: AnalyticsComponent }
];