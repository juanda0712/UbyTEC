import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ResponseI} from '../../../models/response/response.interface'
import {DriversI} from '../../../models/admin/drivers/driver.interface'
import {DriversService} from '../../../service/admin/drivers/drivers.service'

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  getResponse:ResponseI;
  info:DriversI[];
  error_msg="";

  constructor(private router:Router,private api: DriversService) { }

  ngOnInit(): void {
    this.api.getAllDrivers().subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status=="ok"){
        this.info = this.getResponse.result;
      }else{
        this.error_msg= "No se pudieron cargar"
      }
    })
  }

  viewDriver(id:string){
    this.router.navigate(["viewDriver", id])
  }

  newDriver(){
    this.router.navigate(["newDriver"])
  }

}
