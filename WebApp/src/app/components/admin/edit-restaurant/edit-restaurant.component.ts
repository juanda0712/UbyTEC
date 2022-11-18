import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {RestaurantCompleteI} from '../../../models/admin/restaurants/restaurantComplete.interface'
import {RestaurantRequestI} from '../../../models/admin/restaurants/restaurantRequest.interface'
import {RestaurantsService} from '../../../service/admin/restaurants/restaurants.service'
import {ResponseI} from '../../../models/response/response.interface'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  getResponse:ResponseI;
  updateResponse: ResponseI
  idRequest:RestaurantRequestI;
  info:RestaurantCompleteI;
  
  editForm: FormGroup;
  submitedForm: FormGroup;
  numberForm: FormGroup;
  ownerNumberForm: FormGroup;


  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:RestaurantsService,private fb: FormBuilder) {


      this.editForm = this.fb.group({
        ID: '',
        SINPE: 0,
        Email: '',
        Business_name: '',
        Business_type: '',
        Province: '',
        Canton: '',
        District: '',
        Comment: '',
        Old_phone_number:[],
        New_phone_number: this.fb.array([]),
        isVerified: 0,
        OwnerID: '' ,
        OwnerFull_name: '',
        OwnerProvince: '',
        OwnerCanton: '',
        OwnerDistrict: '',
        OwnerOld_phone_number:[],
        OwnerNew_phone_number:this.fb.array([]),
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
        isVerified: 0,
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

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.idRequest = {'ID':URLId}
    
    this.api.getRestaurant(this.idRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = data.result;
        this.editForm.setValue({
          'ID' : this.info.ID,
          'SINPE': this.info.SINPE,
          'Email': this.info.Email,
          'Business_name': this.info.Business_name,
          'Business_type': this.info.Business_type,
          'Old_phone_number':this.info.Phone_number,
          'New_phone_number':[],
          'Province': this.info.Province,
          'Canton':this.info.Canton,
          'District': this.info.District,
          'Comment': this.info.Comment,
          'isVerified': this.info.isVerified,
          'OwnerID': this.info.Owner.ID ,
          'OwnerFull_name': this.info.Owner.Full_name,
          'OwnerProvince': this.info.Owner.Province,
          'OwnerCanton': this.info.Owner.Canton,
          'OwnerDistrict': this.info.Owner.District,
          'OwnerOld_phone_number':this.info.Owner.Phone_number,
          'OwnerNew_phone_number':[],
          'OwnerUsername': this.info.Owner.Username,
          'OwnerPassword': this.info.Owner.Password
        })
      }else{
        alert("No se pudo cargar correctamente")
      }}) 
  }

  putForm(form:any){
    
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
        'Phone_number':form.Old_phone_number.concat(form.New_phone_number),
        'isVerified': form.isVerified,
        'Owner': {
          'ID': form.OwnerID ,
          'Full_name': form.OwnerFull_name,
          'Province': form.OwnerProvince,
          'Canton': form.OwnerCanton,
          'District': form.OwnerDistrict,
          'Phone_number':form.OwnerOld_phone_number.concat(form.OwnerNew_phone_number),
          'Username': form.OwnerUsername,
          'Password': form.OwnerPassword
        }
    })
    
    this.api.putRestaurant(this.submitedForm.value).subscribe(data =>{
      this.updateResponse = data;
      if(this.updateResponse.status == "ok"){
        alert("Actualizado exitosamente")
      }else{
        alert("No se pudo actualizar")
      }});
    this.exit();
  }

  exit(){
    this.router.navigate(["viewRestaurant", this.activerouter.snapshot.paramMap.get('id')])
  }

  get itemsFormArray(): FormArray {
    return this.editForm.get('New_phone_number') as FormArray;
  };

  get itemsFormArray2(): FormArray {
    return this.editForm.get('OwnerNew_phone_number') as FormArray;
  };

  addItem(value: number) {
    this.itemsFormArray.push(new FormControl(value));
    this.numberForm.reset();
  }

  addItem2(value: number) {
    this.itemsFormArray2.push(new FormControl(value));
    this.ownerNumberForm.reset();
  }

  removeOldItem(value: number, type: string) {
    if(type == 'restaurant'){

      let  updatedPhones = this.editForm.value.Old_phone_number.filter((item:any) => item !== value) 
      this.editForm.setValue({
        'ID' : this.editForm.value.ID,
        'SINPE': this.editForm.value.SINPE,
        'Email': this.editForm.value.Email,
        'Business_name': this.editForm.value.Business_name,
        'Business_type': this.editForm.value.Business_type,
        'Old_phone_number':updatedPhones,
        'New_phone_number':this.editForm.value.New_phone_number,
        'Province': this.editForm.value.Province,
        'Canton':this.editForm.value.Canton,
        'District': this.editForm.value.District,
        'Comment': this.editForm.value.Comment,
        'isVerified': this.editForm.value.isVerified,
        'OwnerID': this.editForm.value.OwnerID ,
        'OwnerFull_name': this.editForm.value.OwnerFull_name,
        'OwnerProvince': this.editForm.value.OwnerProvince,
        'OwnerCanton': this.editForm.value.OwnerCanton,
        'OwnerDistrict': this.editForm.value.OwnerDistrict,
        'OwnerOld_phone_number': this.editForm.value.OwnerOld_phone_number,
        'OwnerNew_phone_number': this.editForm.value.OwnerNew_phone_number,
        'OwnerUsername': this.editForm.value.OwnerUsername,
        'OwnerPassword': this.editForm.value.OwnerPassword
      }) ;
      this.numberForm.reset();
    }else{

      let  updatedPhones2 = this.editForm.value.OwnerOld_phone_number.filter((item:any) => item !== value) 
      this.editForm.setValue({
        'ID' : this.editForm.value.ID,
        'SINPE': this.editForm.value.SINPE,
        'Email': this.editForm.value.Email,
        'Business_name': this.editForm.value.Business_name,
        'Business_type': this.editForm.value.Business_type,
        'Old_phone_number': this.editForm.value.Old_phone_number,
        'New_phone_number':this.editForm.value.New_phone_number,
        'Province': this.editForm.value.Province,
        'Canton':this.editForm.value.Canton,
        'District': this.editForm.value.District,
        'Comment': this.editForm.value.Comment,
        'isVerified': this.editForm.value.isVerified,
        'OwnerID': this.editForm.value.OwnerID ,
        'OwnerFull_name': this.editForm.value.OwnerFull_name,
        'OwnerProvince': this.editForm.value.OwnerProvince,
        'OwnerCanton': this.editForm.value.OwnerCanton,
        'OwnerDistrict': this.editForm.value.OwnerDistrict,
        'OwnerOld_phone_number': updatedPhones2,
        'OwnerNew_phone_number': this.editForm.value.OwnerNew_phone_number,
        'OwnerUsername': this.editForm.value.OwnerUsername,
        'OwnerPassword': this.editForm.value.OwnerPassword
      });
      console.log(updatedPhones2)
      this.ownerNumberForm.reset();
    }
  }
}
