import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import {Router} from '@angular/router'

import {LoginService} from '../../../service/login/login.service'
import {LoginI} from '../../../models/login/login.interface'
import {UserI} from '../../../models/login/user.interface'
import {ResponseI} from '../../../models/response/response.interface'

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})

export class LoginAdminComponent implements OnInit {

  loginForm: FormGroup;

  errorStatus:boolean =false;
  errorMsj:any = "";

  loginResponse:ResponseI;
  userInfo: UserI;

  constructor(private api: LoginService, private router:Router, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onLogin(form:LoginI){
    this.api.login(form, 'loginAdmin').subscribe(data => {
      this.loginResponse = data;
      if(this.loginResponse.status == "ok"){
        this.userInfo = this.loginResponse.result;
        localStorage.setItem("token", this.userInfo.id);
        localStorage.setItem("user", "admin");
        //this.router.navigate(['homeAdmin']);
      }else{
        this.errorStatus= true;
        this.errorMsj = "Credenciales invalidas";
      }
    })
  }
}
