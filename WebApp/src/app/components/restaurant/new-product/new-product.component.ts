import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProductI} from '../../../models/restaurant/products/product.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {ProductService} from '../../../service/restaurant/product/product.service'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  updateResponse: ResponseI  
  editForm: FormGroup;

  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:ProductService,private fb: FormBuilder) {


      this.editForm = this.fb.group({
        ID: '',
        Product_name: '',
        Category: '',
        Price: '',
        Image: '',
        Restaurant_ID: this.getRestaurant().Restaurant_ID
      })
     }

  ngOnInit(): void {
  }

  putForm(form:ProductI){
    console.log(form)
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

  getRestaurant(){
    let ID = localStorage.getItem('token');
    let object = {Restaurant_ID:ID}
    return object
  }
}
