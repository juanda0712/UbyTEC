import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userSection:string

  constructor() { }


  ngOnInit(): void {

    let user = this.getUser();

    if(user == "admin"){
      this.userSection = "admin"
    }else if (user == "restaurant") {
      this.userSection = "restaurant"
    } else {
      this.userSection = "client" 
    }
  }

  getUser(){
    return localStorage.getItem('user');
  }
}
