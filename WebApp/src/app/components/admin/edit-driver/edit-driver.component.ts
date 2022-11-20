import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DriversI} from '../../../models/admin/drivers/driver.interface'
import {DriversRequestI} from '../../../models/admin/drivers/driverRequest.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {DriversService} from '../../../service/admin/drivers/drivers.service'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  getResponse:ResponseI;
  updateResponse: ResponseI
  idRequest:DriversRequestI;
  info:DriversI;
  
  editForm: FormGroup;
  submitedForm: FormGroup;
  numberForm: FormGroup


  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:DriversService,private fb: FormBuilder) {


      this.editForm = this.fb.group({
        ID: '',
        State: '',
        Password: '',
        Full_name: '',
        Province: '',
        Canton: '',
        District: '',
        Email: '',
        Old_phone_number:[],
        New_phone_number: this.fb.array([]),
      })

      this.submitedForm = this.fb.group({
        ID: '',
        State: '',
        Password: '',
        Full_name: '',
        Province: '',
        Canton: '',
        District: '',
        Email: '',
        Phone_number:[]
      })

      this.numberForm = this.fb.group({
        number: ''
      })

     }

  ngOnInit(): void {

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.idRequest = {'ID':URLId}
    
    this.api.getDriver(this.idRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = data.result;
        this.editForm.setValue({
          'ID': this.info.ID,
          'State': this.info.State,
          'Password': this.info.Password,
          'Full_name': this.info.Full_name,
          'Province': this.info.Province,
          'Canton': this.info.Canton,
          'District': this.info.District,
          'Email': this.info.Email,
          'Old_phone_number':this.info.Phone_number,
          'New_phone_number': [],
        })
      }else{
        alert("No se pudo cargar")
      }})
      
      
  }

  putForm(form:any){
    this.submitedForm.setValue({
      'ID': form.ID,
      'State': form.State,
      'Password': form.Password,
      'Full_name': form.Full_name,
      'Province': form.Province,
      'Canton': form.Canton,
      'District': form.District,
      'Email': form.Email,
      'Phone_number':form.Old_phone_number.concat(form.New_phone_number)
    })
    this.api.putDriver(this.submitedForm.value).subscribe(data =>{
      this.updateResponse = data;
      if(this.updateResponse.status == "ok"){
        alert("Actualizado exitosamente")
      }else{
        alert("No se pudo actualizar")
      }});
    this.exit();
  }

  exit(){
    this.router.navigate(["viewDriver", this.activerouter.snapshot.paramMap.get('id')])
  }

  get itemsFormArray(): FormArray {
    return this.editForm.get('New_phone_number') as FormArray;
  };

  addItem(value: number) {
    this.itemsFormArray.push(new FormControl(value));
    this.numberForm.reset();
  }

  removeOldItem(value: number) {
    let  updatedPhones = this.editForm.value.Old_phone_number.filter((item:any) => item !== value) 
    this.editForm.setValue({
      'ID': this.editForm.value.ID,
      'State': this.editForm.value.State,
      'Password': this.editForm.value.Password,
      'Full_name': this.editForm.value.Full_name,
      'Province': this.editForm.value.Province,
      'Canton': this.editForm.value.Canton,
      'District': this.editForm.value.District,
      'Email': this.editForm.value.Email,
      'Old_phone_number': updatedPhones,
      'New_phone_number': this.editForm.value.New_phone_number,
    }) ;
    this.numberForm.reset()
  }

}
