import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProductI} from '../../../models/restaurant/products/product.interface'
import {ProductRequestI} from '../../../models/restaurant/products/productRequest.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {ProductService} from '../../../service/restaurant/product/product.service'

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:ProductService) { }

  getResponse:ResponseI;
  deletedResponse:ResponseI
  info:ProductI;
  idRequest:ProductRequestI;

  ngOnInit(): void {

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.idRequest = {"ID":URLId}
    
    this.api.getProduct(this.idRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = this.getResponse.result;
      }else{
        alert("No se pudo cargar")
      }
    })
  }
  
  edit(){
    this.router.navigate(["editProduct", this.activerouter.snapshot.paramMap.get('id')])
  }

  delete(){
    this.api.deleteProduct(this.idRequest).subscribe(data => {
      this.deletedResponse = data;
      if(this.deletedResponse.status == 'ok'){
        alert('Eliminado correctamente')
      }else{
        alert('No se pudo eleminar')
      }
    })
    this.exit()
  }

  exit(){
    this.router.navigate(["products"])
  }

}
