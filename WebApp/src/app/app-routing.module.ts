import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';
import { ViewEmployeeComponent } from './components/admin/view-employee/view-employee.component';
import { EditEmployeeComponent } from './components/admin/edit-employee/edit-employee.component';
import { NewEmployeeComponent } from './components/admin/new-employee/new-employee.component';

const routes: Routes = [
  {path:'loginAdmin',component:LoginAdminComponent},
  {path:'homeAdmin',component:HomeAdminComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'viewEmployee/:id',component:ViewEmployeeComponent},
  {path:'editEmployee/:id',component:EditEmployeeComponent},
  {path:'newEmployee',component:NewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginAdminComponent, HomeAdminComponent,EmployeesComponent,ViewEmployeeComponent,
  EditEmployeeComponent,NewEmployeeComponent]
