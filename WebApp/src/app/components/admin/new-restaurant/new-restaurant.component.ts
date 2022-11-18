import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {RestaurantCompleteI} from '../../../models/admin/restaurants/restaurantComplete.interface'
import {RestaurantRequestI} from '../../../models/admin/restaurants/restaurantRequest.interface'
import {RestaurantsService} from '../../../service/admin/restaurants/restaurants.service'
import {ResponseI} from '../../../models/response/response.interface'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {

  updateResponse: ResponseI
  idRequest:RestaurantRequestI;
  info:RestaurantCompleteI;
  
  newForm: FormGroup;
  submitedForm: FormGroup;
  numberForm: FormGroup
  ownerNumberForm: FormGroup


  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:RestaurantsService,private fb: FormBuilder) {

      this.newForm = this.fb.group({
        ID: '',
        SINPE: 0,
        Email: '',
        Business_name: '',
        Business_type: '',
        Province: '',
        Canton: '',
        District: '',
        Comment: '',
        Phone_number:this.fb.array([]),
        isVerified: 1,
        OwnerID: '' ,
        OwnerFull_name: '',
        OwnerProvince: '',
        OwnerCanton: '',
        OwnerDistrict: '',
        OwnerPhone_number:this.fb.array([]),
        OwnerUsername: '',
        OwnerPassword: ''
      })

      this.submitedForm = this.fb.group({
        ID: '',
        SINPE: 0,
        Email: '',
        Business_name: '',
        Business_type: '',
        Province: '',
        Canton: '',
        District: '',
        Comment: '',
        Phone_number:[],
        isVerified: 1,
        Owner: {
          ID: '' ,
          Full_name: '',
          Province: '',
          Canton: '',
          District: '',
          Phone_number:[],
          Username: '',
          Password: ''
        }
      })

      this.numberForm = this.fb.group({
        number: ''
      })

      this.ownerNumberForm = this.fb.group({
        number: ''
      })

     }

  ngOnInit(): void {
  }

  postForm(form:any){

    this.submitedForm.setValue({
      'ID': form.ID,
      'SINPE': form.SINPE,
      'Email': form.Email,
      'Business_name': form.Business_name,
      'Business_type': form.Business_type,
      'Province': form.Province,
      'Canton': form.Canton,
      'District': form.District,
      'Comment': form.Comment,
      'Phone_number':form.Phone_number,
      'isVerified': form.isVerified,
      'Owner': {
        'ID': form.OwnerID ,
        'Full_name': form.OwnerFull_name,
        'Province': form.OwnerProvince,
        'Canton': form.OwnerCanton,
        'District': form.OwnerDistrict,
        'Phone_number':form.OwnerPhone_number,
        'Username': form.OwnerUsername,
        'Password': form.OwnerPassword
      }
    })
    this.api.postRestaurant(this.submitedForm.value).subscribe(data =>{
      this.updateResponse = data;
      if(this.updateResponse.status == "ok"){
        alert("Creado exitosamente")
      }else{
        alert("No se pudo crear")
      }});
    this.exit();
  }

  exit(){
    this.router.navigate(["restaurants"])
  }

  get itemsFormArray(): FormArray {
    return this.newForm.get('Phone_number') as FormArray;
  };

  get itemsFormArray2(): FormArray {
    return this.newForm.get('OwnerPhone_number') as FormArray;
  };

  addItem(value: number) {
    this.itemsFormArray.push(new FormControl(value));
    this.numberForm.reset(); 
  }

  addItem2(value: number) {
    this.itemsFormArray2.push(new FormControl(value));
    this.ownerNumberForm.reset();
  }
}
