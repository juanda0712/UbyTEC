import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProductI} from '../../../models/restaurant/products/product.interface'
import {ProductRequestI} from '../../../models/restaurant/products/productRequest.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {ProductService} from '../../../service/restaurant/product/product.service'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  getResponse:ResponseI;
  updateResponse: ResponseI
  idRequest:ProductRequestI;
  info:ProductI;
  
  editForm: FormGroup;



  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:ProductService,private fb: FormBuilder) {


      this.editForm = this.fb.group({
        ID: '',
        Product_name: '',
        Category: '',
        Price: '',
        Image: '',
        Restaurant_ID: ''
      })
     }

  ngOnInit(): void {

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.idRequest = {'ID':URLId}
    
    this.api.getProduct(this.idRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = data.result;
        this.editForm.setValue({
          'ID': this.info.ID,
          'Product_name': this.info.Product_name,
          'Category': this.info.Category,
          'Price': this.info.Price,
          'Image': this.info.Image,
          'Restaurant_ID': this.info.Restaurant_ID
        })
      }else{
        alert("No se pudo cargar")
      }})
  }

  putForm(form:any){
    this.api.putProduct(form).subscribe(data =>{
      this.updateResponse = data;
      if(this.updateResponse.status == "ok"){
        alert("Actualizado exitosamente")
      }else{
        alert("No se pudo actualizar")
      }});
    this.exit();
  }

  exit(){
    this.router.navigate(["viewProduct", this.activerouter.snapshot.paramMap.get('id')])
  }
}
