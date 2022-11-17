import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ResponseI} from '../../../models/response/response.interface'
import {EmployeeI} from '../../../models/admin/employees/employee.interface'
import {EmployeeRequestI} from '../../../models/admin/employees/employeeRequest.interface'
import * as myGlobals from '../../../../../src/globals'

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  url = myGlobals.URL

  constructor(private http:HttpClient) { }

  getAllEmployees():Observable<ResponseI>{
    let direccion = this.url + "getAllEmployees";
    return this.http.get<ResponseI>(direccion);
  }

  getEmployee(id:EmployeeRequestI):Observable<ResponseI>{
    let direccion = this.url + "getEmployee"
    let Options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:id
    }
    return this.http.get<ResponseI>(direccion,Options);
  }

  postEmployee(form:EmployeeI):Observable<ResponseI>{
    let direccion = this.url + "addEmployee";
    return this.http.post<ResponseI>(direccion,form)
  }

  putEmployee(form:EmployeeI):Observable<ResponseI>{
    let direccion = this.url + "updateEmployee";
    return this.http.put<ResponseI>(direccion,form);
  }

  deleteEmployee(id:EmployeeRequestI):Observable<ResponseI>{
    let direccion = this.url + "deleteEmployee";
    let Options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:id
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  getTest():Observable<ResponseI>{
    let direccion = this.url + "UserControllerTest";
    return this.http.get<ResponseI>(direccion);
  }
}
