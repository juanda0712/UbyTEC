import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ResponseI} from '../../../models/response/response.interface'
import {RestaurantReportI} from '../../../models/admin/reports/restaurantReports.interface'
import {ReportsService} from '../../../service/admin/reports/reports.service'
import { SumPipe } from '../../../pipe/sum.pipe';

@Component({
  selector: 'app-restaurant-reports',
  templateUrl: './restaurant-reports.component.html',
  styleUrls: ['./restaurant-reports.component.css']
})
export class RestaurantReportsComponent implements OnInit {

  getResponse:ResponseI;
  info:RestaurantReportI[];
  error_msg="";

  constructor(private router:Router,private api: ReportsService) { }

  ngOnInit(): void {
    this.api.getRestaurantReports().subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status=="ok"){
        this.info = this.getResponse.result;
      }else{
        this.error_msg= "No se pudieron cargar los reportes"
      }
    })
  }

  generateReport(){
    //GENERAR REPORTE
  }

}
