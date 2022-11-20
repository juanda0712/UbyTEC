import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EmployeeI} from '../../../models/admin/employees/employee.interface'
import {EmployeeRequestI} from '../../../models/admin/employees/employeeRequest.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {EmployeesService} from '../../../service/admin/employees/employees.service'

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:EmployeesService) { }

  getResponse:ResponseI;
  deletedResponse:ResponseI
  info:EmployeeI;
  idRequest:EmployeeRequestI;

  ngOnInit(): void {

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.idRequest = {"ID":URLId}
    
    this.api.getEmployee(this.idRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = this.getResponse.result;
      }else{
        alert("No se pudo cargar el empleado")
      }
    })
    
  }
  
  edit(){
    this.router.navigate(["editEmployee", this.activerouter.snapshot.paramMap.get('id')])
  }

  delete(){
    this.api.deleteEmployee(this.idRequest).subscribe(data => {
      this.deletedResponse = data;
      if(this.deletedResponse.status == 'ok'){
        alert('Empleado eliminado correctamente')
      }else{
        alert('No se pudo eleminar el empleado')
      }

    })
    this.exit()
  }

  exit(){
    this.router.navigate(["employees"])
  }
}
