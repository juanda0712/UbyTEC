import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';


const routes: Routes = [
  {path:'loginAdmin',component:LoginAdminComponent},
  {path:'homeAdmin',component:HomeAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginAdminComponent, HomeAdminComponent]
