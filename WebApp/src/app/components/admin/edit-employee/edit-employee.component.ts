import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EmployeeI} from '../../../models/admin/employees/employee.interface'
import {EmployeeRequestI} from '../../../models/admin/employees/employeeRequest.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {EmployeesService} from '../../../service/admin/employees/employees.service'
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms'

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


  getResponse:ResponseI;
  updateResponse: ResponseI
  idRequest:EmployeeRequestI;
  info:EmployeeI;
  
  editForm: FormGroup;
  submitedForm: FormGroup;
  numberForm: FormGroup


  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:EmployeesService,private fb: FormBuilder) {


      this.editForm = this.fb.group({
        ID: '',
        Full_name: '',
        Province: '',
        Canton: '',
        District: '',
        Old_phone_number:[],
        New_phone_number: this.fb.array([]),
        Username: '',
        Password: ''
      })

      this.submitedForm = this.fb.group({
        ID: '',
        Full_name: '',
        Province: '',
        Canton: '',
        District: '',
        Phone_number:[],
        Username: '',
        Password: ''
      })

      this.numberForm = this.fb.group({
        number: ''
      })

     }

  ngOnInit(): void {

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.idRequest = {'ID':URLId}
    
    this.api.getEmployee(this.idRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = data.result;
        this.editForm.setValue({
          'ID' : this.info.ID,
          'Full_name': this.info.Full_name,
          'Province': this.info.Province,
          'Canton': this.info.Canton,
          'District': this.info.District,
          'Old_phone_number':this.info.Phone_number,
          'New_phone_number':[],
          'Username': this.info.Username,
          'Password':this.info.Password
        })
      }else{
        alert("No se pudo cargar el empleado")
      }})
      
      
  }

  putForm(form:any){
    this.submitedForm.setValue({
      'ID' : form.ID,
      'Full_name': form.Full_name,
      'Province': form.Province,
      'Canton': form.Canton,
      'District': form.District,
      'Phone_number':form.Old_phone_number.concat(form.New_phone_number),
      'Username': form.Username,
      'Password':form.Password
    })
    this.api.putEmployee(this.submitedForm.value).subscribe(data =>{
      this.updateResponse = data;
      if(this.updateResponse.status == "ok"){
        alert("Empleado actualizado exitosamente")
      }else{
        alert("No se pudo actualizar el empleado")
      }});
    this.exit();
  }

  exit(){
    this.router.navigate(["viewEmployee", this.activerouter.snapshot.paramMap.get('id')])
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
      'ID' : this.editForm.value.ID,
      'Full_name': this.editForm.value.Full_name,
      'Province': this.editForm.value.Province,
      'Canton': this.editForm.value.Canton,
      'District': this.editForm.value.District,
      'Old_phone_number':updatedPhones,
      'New_phone_number':this.editForm.value.New_phone_number,
      'Username': this.editForm.value.Username,
      'Password':this.editForm.value.Password
    }) ;
    this.numberForm.reset()
  }
}
