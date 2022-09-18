import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  changePassForm:FormGroup
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.changePassForm = new FormGroup({
      oldPassword: new FormControl(),
      newPassword : new FormControl()
    })
  }
  changePassword(){
    this.userService.changePass(this.changePassForm.value).subscribe(response=>{
      console.log(response);
      
    })
  }
}
