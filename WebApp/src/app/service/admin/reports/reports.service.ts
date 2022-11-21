import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ResponseI} from '../../../models/response/response.interface'
import * as myGlobals from '../../../../../src/globals'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  url = myGlobals.URL

  constructor(private http:HttpClient) { }

  getClientReports():Observable<ResponseI>{
    let direccion = this.url + "getClientReport";
    return this.http.get<ResponseI>(direccion);
  }

  getRestaurantReports():Observable<ResponseI>{
    let direccion = this.url + "getRestaurantReport";
    return this.http.get<ResponseI>(direccion);
  }

  getTest():Observable<ResponseI>{
    let direccion = this.url + "UserControllerTest";
    return this.http.get<ResponseI>(direccion);
  }
}
