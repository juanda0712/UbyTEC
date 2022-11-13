import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { LoginI } from '../../models/login/login.interface'
import { ResponseI } from '../../models/response/response.interface'
import * as myGlobals from '../../../../src/globals'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = myGlobals.URL
  constructor(private http:HttpClient) { }

  login( form:LoginI, userType:string ): Observable<ResponseI>{
    let direccion = this.url + userType;
    return this.http.post<ResponseI>(direccion,form)
  }

  getTest():Observable<ResponseI>{
    let direccion = this.url + "UserControllerTest";
    return this.http.get<ResponseI>(direccion);
  }
}
