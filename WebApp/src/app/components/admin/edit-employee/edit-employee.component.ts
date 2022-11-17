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


  employeeResponse:ResponseI;
  updateResponse: ResponseI
  employeeRequest:EmployeeRequestI;
  employeeInfo:EmployeeI;
  
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

    let employeeId = this.activerouter.snapshot.paramMap.get('id');
    this.employeeRequest = {'ID':employeeId}
    
    this.api.getEmployee(this.employeeRequest).subscribe(data =>{
      this.employeeResponse = data;
      if(this.employeeResponse.status == "ok"){
        this.employeeInfo = data.result;
        this.editForm.setValue({
          'ID' : this.employeeInfo.ID,
          'Full_name': this.employeeInfo.Full_name,
          'Province': this.employeeInfo.Province,
          'Canton': this.employeeInfo.Canton,
          'District': this.employeeInfo.District,
          'Old_phone_number':this.employeeInfo.Phone_number,
          'New_phone_number':[],
          'Username': this.employeeInfo.Username,
          'Password':this.employeeInfo.Password
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
      'ID' : this.employeeInfo.ID,
      'Full_name': this.employeeInfo.Full_name,
      'Province': this.employeeInfo.Province,
      'Canton': this.employeeInfo.Canton,
      'District': this.employeeInfo.District,
      'Old_phone_number':updatedPhones,
      'New_phone_number':this.editForm.value.New_phone_number,
      'Username': this.employeeInfo.Username,
      'Password':this.employeeInfo.Password
    }) ;
    this.numberForm.reset()
  }
}
