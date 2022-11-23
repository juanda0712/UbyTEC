import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { ResponseI } from '../../models/response/response.interface'
import * as myGlobals from '../../../../src/globals'
import { RestaurantCompleteI } from 'src/app/models/restaurant/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url = myGlobals.URL
  constructor(private http:HttpClient) { }

  register( form:RestaurantCompleteI): Observable<ResponseI>{
    let direccion = this.url + 'addRestaurant';
    return this.http.post<ResponseI>(direccion,form)
  }

  getTest():Observable<ResponseI>{
    let direccion = this.url + "UserControllerTest";
    return this.http.get<ResponseI>(direccion);
  }
}
