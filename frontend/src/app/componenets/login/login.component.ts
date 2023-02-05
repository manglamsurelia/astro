import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loginsucces: boolean = false
  public loginError:boolean=false
  constructor(private userService: UserService, private router: Router,private toaster: ToastrService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  login() {
    this.loginsucces = true
    let user = this.loginForm.value;
    // console.log(user);
    this.userService.login(user).subscribe(res => {
      if (res.sucess = true) {
        this.toaster.success(" successfully LoggedIn !!", " successfully LoggedIn !!")
        localStorage.setItem('token', res?.token);
        localStorage.setItem('Role', res.role)
        this.router.navigateByUrl('/dashboard');
      }
      else{
        this.toaster.error(" successfully LoggedIn !!", " successfully LoggedIn !!")
      }
    });
  }

}
