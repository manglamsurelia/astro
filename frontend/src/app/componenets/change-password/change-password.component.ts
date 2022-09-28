import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm:FormGroup
  constructor(private userService: UserService,  private toaster:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.changePassForm = new FormGroup({
      oldPassword: new FormControl(),
      newPassword : new FormControl()
    })
  }
  changePassword(){
    this.userService.changePass(this.changePassForm.value).subscribe(response=>{
      if(response.sucess == true){
        this.toaster.success("Password Updated Successfully !!", "Password Updated Successfully !!");
        localStorage.clear();
        this.router.navigateByUrl('login');
      }
      
    })
  }
}
