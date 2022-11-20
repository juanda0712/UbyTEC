import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DriversI} from '../../../models/admin/drivers/driver.interface'
import {DriversRequestI} from '../../../models/admin/drivers/driverRequest.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {DriversService} from '../../../service/admin/drivers/drivers.service'

@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.css']
})
export class ViewDriverComponent implements OnInit {

  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:DriversService) { }

  getResponse:ResponseI;
  deletedResponse:ResponseI
  info:DriversI;
  idRequest:DriversRequestI;

  ngOnInit(): void {

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.idRequest = {"ID":URLId}
    
    this.api.getDriver(this.idRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = this.getResponse.result;
      }else{
        alert("No se pudo cargar")
      }
    })
  }
  
  edit(){
    this.router.navigate(["editDriver", this.activerouter.snapshot.paramMap.get('id')])
  }

  delete(){
    this.api.deleteDriver(this.idRequest).subscribe(data => {
      this.deletedResponse = data;
      if(this.deletedResponse.status == 'ok'){
        alert('Eliminado correctamente')
      }else{
        alert('No se pudo eleminar')
      }
    })
    this.exit()
  }

  exit(){
    this.router.navigate(["drivers"])
  }

}
