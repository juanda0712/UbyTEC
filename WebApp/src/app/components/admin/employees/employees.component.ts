import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ResponseI} from '../../../models/response/response.interface'
import {EmployeeI} from '../../../models/admin/employees/employee.interface'
import {EmployeesService} from '../../../service/admin/employees/employees.service'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeeResponse:ResponseI;
  employees:EmployeeI[];
  error_msg="";

  constructor(private router:Router,private api: EmployeesService) { }

  ngOnInit(): void {
    this.api.getAllEmployees().subscribe(data =>{
      this.employeeResponse = data;
      if(this.employeeResponse.status=="ok"){
        this.employees = this.employeeResponse.result;
      }else{
        this.error_msg= "No se pudieron cargar los empleados"
      }
    })
  }

  viewEmployee(id:string){
    this.router.navigate(["viewEmployee", id])
  }

  newEmployee(){
    this.router.navigate(["newEmployee"])
  }
}
