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

  employeeResponse:ResponseI;
  employeeInfo:EmployeeI;
  employeeRequest:EmployeeRequestI;

  ngOnInit(): void {

    let workerId = this.activerouter.snapshot.paramMap.get('id');
    this.employeeRequest = {"ID":workerId}
    
    this.api.getEmployee(this.employeeRequest).subscribe(data =>{
      this.employeeResponse = data;
      if(this.employeeResponse.status == "ok"){
        this.employeeInfo = this.employeeResponse.result;
      }else{
        alert("No se pudo cargar el empleado")
      }
    })
    
  }
  
  edit(){
    this.router.navigate(["editEmployee", this.activerouter.snapshot.paramMap.get('id')])
  }

  delete(){
    this.api.deleteEmployee(this.employeeRequest)
    this.exit()
  }

  exit(){
    this.router.navigate(["employees"])
  }
}
