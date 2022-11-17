import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EmployeeI} from '../../../models/admin/employees/employee.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {EmployeesService} from '../../../service/admin/employees/employees.service'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  postResponse: ResponseI
  employeeInfo:EmployeeI;
  
  newForm: FormGroup;
  numberForm: FormGroup


  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:EmployeesService,private fb: FormBuilder) {


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

  postForm(form:EmployeeI){
    
    this.api.postEmployee(form).subscribe(data =>{
      this.postResponse = data;
      if(this.postResponse.status == "ok"){
        alert("Empleado agregado exitosamente")
      }else{
        alert("No se pudo agregar el empleado")
      }});
    this.exit();
  }

  exit(){
    this.router.navigate(["employees"])
  }

  get itemsFormArray(): FormArray {
    return this.newForm.get('Phone_number') as FormArray;
  };

  addItem(value: number) {
    this.itemsFormArray.push(new FormControl(value));
    this.numberForm.reset();
  }
}
