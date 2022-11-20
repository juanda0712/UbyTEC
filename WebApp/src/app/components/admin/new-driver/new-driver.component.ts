import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DriversI} from '../../../models/admin/drivers/driver.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {DriversService} from '../../../service/admin/drivers/drivers.service'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.css']
})
export class NewDriverComponent implements OnInit {

  postResponse: ResponseI
  
  newForm: FormGroup;
  numberForm: FormGroup


  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:DriversService,private fb: FormBuilder) {


      this.newForm = this.fb.group({
        ID: '',
        Full_name: '',
        Province: '',
        Canton: '',
        District: '',
        Phone_number: this.fb.array([]),
        Username: '',
        Password: ''
      })

      this.numberForm = this.fb.group({
        number: ''
      })

     }

  ngOnInit(): void {
  }

  postForm(form:DriversI){
    this.api.postDriver(form).subscribe(data =>{
      this.postResponse = data;
      if(this.postResponse.status == "ok"){
        alert("Empleado agregado exitosamente")
      }else{
        alert("No se pudo agregar el empleado")
      }});
    this.exit();
  }

  exit(){
    this.router.navigate(["drivers"])
  }

  get itemsFormArray(): FormArray {
    return this.newForm.get('Phone_number') as FormArray;
  };

  addItem(value: number) {
    this.itemsFormArray.push(new FormControl(value));
    this.numberForm.reset();
  }

}
