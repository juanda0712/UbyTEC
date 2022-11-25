import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ResponseI} from '../../../models/response/response.interface'
import {ProductI} from '../../../models/restaurant/products/product.interface'
import {ProductService} from '../../../service/restaurant/product/product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  getResponse:ResponseI;
  info:ProductI[];
  error_msg="";

  constructor(private router:Router,private api: ProductService) { }

  ngOnInit(): void {
    let restaurantID = this.getRestaurant()
    this.api.getAllProducts(restaurantID).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status=="ok"){
        this.info = this.getResponse.result;
      }else{
        this.error_msg= "No se pudieron cargar"
      }
    })
  }

  viewProduct(id:string){
    this.router.navigate(["viewProduct", id])
  }

  newProduct(){
    this.router.navigate(["newProduct"])
  }

  getRestaurant(){
    let ID = localStorage.getItem('token');
    let object = {Restaurant_ID:ID}
    return object
  }

}
