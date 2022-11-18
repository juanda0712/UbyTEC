import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResponseI } from '../../../models/response/response.interface'
import { RestaurantCompleteI } from '../../../models/admin/restaurants/restaurantComplete.interface'
import { RestaurantRequestI } from '../../../models/admin/restaurants/restaurantRequest.interface'
import * as myGlobals from '../../../../../src/globals'

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  url = myGlobals.URL

  constructor(private http:HttpClient) { }

  getAllApprovedRestaurants():Observable<ResponseI>{
    let direccion = this.url + "getAllApprovedRestaurants";
    return this.http.get<ResponseI>(direccion);
  }

  getAllUnapprovedRestaurants():Observable<ResponseI>{
    let direccion = this.url + "getAllUnapprovedRestaurants";
    return this.http.get<ResponseI>(direccion);
  }

  getRestaurant(id:RestaurantRequestI):Observable<ResponseI>{
    let direccion = this.url + "getRestaurant"
    let Options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:id
    }
    return this.http.get<ResponseI>(direccion,Options);
  }

  postRestaurant(form:RestaurantCompleteI):Observable<ResponseI>{
    let direccion = this.url + "addRestaurant";
    return this.http.post<ResponseI>(direccion,form)
  }

  putRestaurant(form:RestaurantCompleteI):Observable<ResponseI>{
    let direccion = this.url + "updateRestaurant";
    return this.http.put<ResponseI>(direccion,form);
  }

  deleteRestaurant(id:RestaurantRequestI):Observable<ResponseI>{
    let direccion = this.url + "deleteRestaurant";
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
