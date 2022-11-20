import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ResponseI} from '../../../models/response/response.interface'
import {DriversI} from '../../../models/admin/drivers/driver.interface'
import {DriversRequestI} from '../../../models/admin/drivers/driverRequest.interface'
import * as myGlobals from '../../../../../src/globals'

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  url = myGlobals.URL

  constructor(private http:HttpClient) { }

  getAllDrivers():Observable<ResponseI>{
    let direccion = this.url + "getAllDrivers";
    return this.http.get<ResponseI>(direccion);
  }

  getDriver(id:DriversRequestI):Observable<ResponseI>{
    let direccion = this.url + "getDriver"
    let Options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:id
    }
    return this.http.get<ResponseI>(direccion,Options);
  }

  postDriver(form:DriversI):Observable<ResponseI>{
    let direccion = this.url + "addDriver";
    return this.http.post<ResponseI>(direccion,form)
  }

  putDriver(form:DriversI):Observable<ResponseI>{
    let direccion = this.url + "updateDriver";
    return this.http.put<ResponseI>(direccion,form);
  }

  deleteDriver(id:DriversRequestI):Observable<ResponseI>{
    let direccion = this.url + "deleteDriver";
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
