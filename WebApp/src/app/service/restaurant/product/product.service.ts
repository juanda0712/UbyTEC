import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ResponseI} from '../../../models/response/response.interface'
import {ProductI} from '../../../models/restaurant/products/product.interface'
import {ProductRequestI} from '../../../models/restaurant/products/productRequest.interface'
import { RestaurantResquestI } from '../../../models/restaurant/products/RestaurantRequest.interface'
import * as myGlobals from '../../../../../src/globals'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = myGlobals.URL

  constructor(private http:HttpClient) { }

  getAllProducts(id:RestaurantResquestI):Observable<ResponseI>{
    let direccion = this.url + "getAllProducts";
    return this.http.get<ResponseI>(direccion);
  }

  getProduct(id:ProductRequestI):Observable<ResponseI>{
    let direccion = this.url + "getProduct"
    let Options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:id
    }
    return this.http.get<ResponseI>(direccion,Options);
  }

  postProduct(form:ProductI):Observable<ResponseI>{
    let direccion = this.url + "addProduct";
    return this.http.post<ResponseI>(direccion,form)
  }

  putProduct(form:ProductI):Observable<ResponseI>{
    let direccion = this.url + "updateProduct";
    return this.http.put<ResponseI>(direccion,form);
  }

  deleteProduct(id:ProductRequestI):Observable<ResponseI>{
    let direccion = this.url + "deleteProduct";
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
