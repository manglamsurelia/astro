import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'My Users',  icon: 'dashboard', class: '' },
    { path: '/todo-list', title: 'Todo List',  icon:'content_paste', class: '' },
    // { path: '/notification', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/client', title: 'Client',  icon:'dashboard', class: '' },
    {path:'/customer', title:'Customer', icon:'dashboard',class:''},
    {path:'/user-dataTable', title:'User DataTable', icon:'dashboard',class:''},
    {path:'/invoice', title:'Invoice', icon:'dashboard',class:''}
    
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
