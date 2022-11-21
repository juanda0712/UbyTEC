import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ResponseI} from '../../../models/response/response.interface'
import {ClientReportI} from '../../../models/admin/reports/clientReport.interface'
import {ReportsService} from '../../../service/admin/reports/reports.service'
import { SumPipe } from '../../../pipe/sum.pipe';

@Component({
  selector: 'app-client-reports',
  templateUrl: './client-reports.component.html',
  styleUrls: ['./client-reports.component.css']
})
export class ClientReportsComponent implements OnInit {

  getResponse:ResponseI;
  info:ClientReportI[];
  error_msg="";

  constructor(private router:Router,private api: ReportsService) { }

  ngOnInit(): void {
    this.api.getClientReports().subscribe(data =>{
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
