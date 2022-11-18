import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ResponseI} from '../../../models/response/response.interface'
import {RestaurantI} from '../../../models/admin/restaurants/restaurant.interface'
import {RestaurantsService} from '../../../service/admin/restaurants/restaurants.service'

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  getResponse:ResponseI;
  info:RestaurantI[];
  error_msg="";

  constructor(private router:Router,private api: RestaurantsService) { }

  ngOnInit(): void {
    this.api.getAllApprovedRestaurants().subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status=="ok"){
        this.info = this.getResponse.result;
      }else{
        this.error_msg= "No se pudieron cargar los restaurantes"
      }
    })
  }

  viewRestaurant(id:string){
    this.router.navigate(["viewRestaurant", id])
  }

  newRestaurant(){
    this.router.navigate(["newRestaurant"])
  }

}
