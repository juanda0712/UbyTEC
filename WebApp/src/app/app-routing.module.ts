import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';
import { ViewEmployeeComponent } from './components/admin/view-employee/view-employee.component';
import { EditEmployeeComponent } from './components/admin/edit-employee/edit-employee.component';
import { NewEmployeeComponent } from './components/admin/new-employee/new-employee.component';
import { RestaurantsComponent } from './components/admin/restaurants/restaurants.component';
import { ViewRestaurantComponent } from './components/admin/view-restaurant/view-restaurant.component';
import { EditRestaurantComponent } from './components/admin/edit-restaurant/edit-restaurant.component';
import { NewRestaurantComponent } from './components/admin/new-restaurant/new-restaurant.component';
import { AffiliationsComponent } from './components/admin/affiliations/affiliations.component';
import { DriversComponent } from './components/admin/drivers/drivers.component';
import { ViewDriverComponent } from './components/admin/view-driver/view-driver.component';
import { EditDriverComponent } from './components/admin/edit-driver/edit-driver.component';
import { NewDriverComponent } from './components/admin/new-driver/new-driver.component';
import { ClientReportsComponent } from './components/admin/client-reports/client-reports.component';
import { RestaurantReportsComponent } from './components/admin/restaurant-reports/restaurant-reports.component';
import { RestaurantLoginComponent } from './components/restaurant/restaurant-login/restaurant-login.component';
import { RegisterRestaurantComponent } from './components/restaurant/register-restaurant/register-restaurant.component';
import { HomeRestaurantComponent } from './components/restaurant/home-restaurant/home-restaurant.component';
import { ProductsComponent } from './components/restaurant/products/products.component';
import { ViewProductComponent } from './components/restaurant/view-product/view-product.component';
import { EditProductComponent } from './components/restaurant/edit-product/edit-product.component';
import { NewProductComponent } from './components/restaurant/new-product/new-product.component';



const routes: Routes = [
  {path:'loginAdmin',component:LoginAdminComponent},
  {path:'homeAdmin',component:HomeAdminComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'viewEmployee/:id',component:ViewEmployeeComponent},
  {path:'editEmployee/:id',component:EditEmployeeComponent},
  {path:'newEmployee',component:NewEmployeeComponent},
  {path:'restaurants',component:RestaurantsComponent},
  {path:'viewRestaurant/:id',component:ViewRestaurantComponent},
  {path:'editRestaurant/:id',component:EditRestaurantComponent},
  {path:'newRestaurant',component:NewRestaurantComponent},
  {path:'affiliations',component:AffiliationsComponent},
  {path:'drivers',component:DriversComponent},
  {path:'viewDriver/:id',component:ViewDriverComponent},
  {path:'editDriver/:id',component:EditDriverComponent},
  {path:'newDriver',component:NewDriverComponent},
  {path:'clientReports',component:ClientReportsComponent},
  {path:'restaurantReports',component:RestaurantReportsComponent},
  {path:'loginRestaurant',component:RestaurantLoginComponent},
  {path:'restaurantRegister',component:RegisterRestaurantComponent},
  {path:'homeRestaurant',component:HomeRestaurantComponent},
  {path:'products',component:ProductsComponent},
  {path:'viewProduct/:id',component:ViewProductComponent},
  {path:'editProduct/:id',component:EditProductComponent},
  {path:'newProduct',component:NewProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginAdminComponent, HomeAdminComponent,EmployeesComponent,ViewEmployeeComponent,
  EditEmployeeComponent,NewEmployeeComponent,RestaurantsComponent,ViewRestaurantComponent,EditRestaurantComponent,
  NewRestaurantComponent,AffiliationsComponent,DriversComponent,ViewDriverComponent,EditDriverComponent,
  NewDriverComponent,ClientReportsComponent,RestaurantReportsComponent,RestaurantLoginComponent,RegisterRestaurantComponent,
  HomeRestaurantComponent,ProductsComponent,ViewProductComponent,EditProductComponent,NewProductComponent]
