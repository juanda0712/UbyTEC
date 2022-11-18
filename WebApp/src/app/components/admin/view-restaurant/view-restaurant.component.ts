import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {RestaurantI} from '../../../models/admin/restaurants/restaurant.interface'
import {RestaurantRequestI} from '../../../models/admin/restaurants/restaurantRequest.interface'
import {ResponseI} from '../../../models/response/response.interface'
import {RestaurantsService} from '../../../service/admin/restaurants/restaurants.service'


@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent implements OnInit {

  constructor(private activerouter:ActivatedRoute, private router:Router,
    private api:RestaurantsService) { }

  getResponse:ResponseI;
  deletedResponse:ResponseI
  info:RestaurantI;
  IdRequest:RestaurantRequestI;

  ngOnInit(): void {

    let URLId = this.activerouter.snapshot.paramMap.get('id');
    this.IdRequest = {"ID":URLId}
    
    this.api.getRestaurant(this.IdRequest).subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status == "ok"){
        this.info = this.getResponse.result;
      }else{
        alert("No se pudo cargar el restaurante")
      }
    })
  }
  
  edit(){
    this.router.navigate(["editRestaurant", this.activerouter.snapshot.paramMap.get('id')])
  }

  delete(){
    this.api.deleteRestaurant(this.IdRequest).subscribe(data => {
      this.deletedResponse = data;
      if(this.deletedResponse.status == 'ok'){
        alert('Eliminado correctamente')
      }else{
        alert('No se pudo eleminar')
      }

    })
    this.exit()
  }

  exit(){
    this.router.navigate(["restaurants"])
  }

}
