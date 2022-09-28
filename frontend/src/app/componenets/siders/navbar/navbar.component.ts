import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showLogOut:boolean=false
  constructor(private modalService: NgbModal, private router:Router) { }

  ngOnInit(): void {
  }

  showLogOption(){
    this.showLogOut =!this.showLogOut
    console.log(this.showLogOut);
    
  }
  logOut(){
    this.showLogOut=false
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
  changePass(){
    this.showLogOut=false;
    this.router.navigateByUrl('user/changePassword')
  }
}
