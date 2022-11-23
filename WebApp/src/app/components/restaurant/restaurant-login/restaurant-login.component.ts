import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import {Router} from '@angular/router'

import {LoginService} from '../../../service/login/login.service'
import {LoginI} from '../../../models/login/login.interface'
import {UserI} from '../../../models/login/user.interface'
import {ResponseI} from '../../../models/response/response.interface'

@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent implements OnInit {

  loginForm: FormGroup;

  errorStatus:boolean =false;
  errorMsj:any = "";

  loginResponse:ResponseI;
  userInfo: UserI;

  constructor(private api: LoginService, private router:Router, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onLogin(form:LoginI){
    this.api.login(form,'loginRestaurant').subscribe(data => {
      this.loginResponse = data;
      if(this.loginResponse.status == "ok"){
        this.userInfo = this.loginResponse.result;
        localStorage.setItem("token", this.userInfo.ID);
        localStorage.setItem("user", "owner");
        this.router.navigate(['homeRestaurant']);
      }else{
        this.errorStatus= true;
        this.errorMsj = "Credenciales invalidas";
      }
    })
  }

}
