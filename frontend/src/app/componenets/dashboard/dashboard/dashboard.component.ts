import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
export interface User{
  id:number,
  email:string,
  userName:string,
  role:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  addUserForm:FormGroup
  userSpinner:boolean =true
  allRoles = ['User', 'SubAdmin' ]
  displayedColumns: string[] = ['id', 'userName', 'email', 'role'];
   dataSource=new MatTableDataSource<User>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  constructor(private userService:UserService, private toaster:ToastrService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      email :new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      role: new FormControl()
    })
    this.listAllUsers();
  }
  
  addNewUser(){
    this.userService.addUsers(this.addUserForm.value).subscribe(data =>{
      if(data.sucess === true){
        this.toaster.success("User Added successfully !!", "User added successfully !!")
        this.userSpinner=true;
        this.listAllUsers();
      }
    })
  }
  
  listAllUsers(){
    this.userService.userList().subscribe( res=>{
      if(res.sucess === true){
        this.dataSource.data= res.data;
        setTimeout(() => {
          this.userSpinner =false
        }, 200);
       
      }
    })
    
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }

}
