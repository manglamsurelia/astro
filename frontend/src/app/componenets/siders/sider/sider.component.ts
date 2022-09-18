import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/todo-list', title: 'Todo List',  icon:'content_paste', class: '' },
    { path: '/notification', title: 'Notifications',  icon:'notifications', class: '' },
    
];

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {
  menuItems: any[];
  activeTab:string='Dashboard'
  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  activeuser(tab){
this.activeTab = tab
  }
}
