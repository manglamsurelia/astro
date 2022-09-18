import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
export interface userList{
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
  allUsers:userList[]=[]
  allRoles = ['User', 'SubAdmin' ]
  displayedColumns: string[] = ['id', 'userName', 'email', 'role'];
  dataSource;
  constructor(private userService:UserService) {
    this.listAllUsers();
    this.dataSource =this.allUsers
   }
  ngAfterViewInit(): void {
    this.dataSource =this.allUsers    
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      email :new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      role: new FormControl()
    })
    
  }
  
  addNewUser(){
    this.userService.addUsers(this.addUserForm.value).subscribe(data =>{
      console.log(data);
      this.listAllUsers()
    })
  }
  
  listAllUsers(){
    console.log('trying');
    
    this.userService.userList().subscribe( res=>{
      res.data.forEach(element => {
        console.log(element);
        this.allUsers.push(element)
      });
    })
    
  }

}
