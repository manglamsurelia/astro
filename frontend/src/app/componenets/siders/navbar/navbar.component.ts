import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showLogOut:boolean=false
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  showLogOption(){
    this.showLogOut =!this.showLogOut
  }
  logOut(){
    this.showLogOut=false
  }
}
