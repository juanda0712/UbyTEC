import { Component, NgZone, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ResponseI} from '../../../models/response/response.interface'
import {RestaurantI} from '../../../models/admin//restaurants/restaurant.interface'
import {RestaurantsService} from '../../../service/admin/restaurants/restaurants.service'

@Component({
  selector: 'app-affiliations',
  templateUrl: './affiliations.component.html',
  styleUrls: ['./affiliations.component.css']
})
export class AffiliationsComponent implements OnInit {

  getResponse:ResponseI;
  info:RestaurantI[];
  error_msg="";

  constructor(private router:Router,private api: RestaurantsService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.api.getTest().subscribe(data =>{
      this.getResponse = data;
      if(this.getResponse.status=="ok"){
        this.info = this.getResponse.result;
      }else{
        this.error_msg= "No se pudieron cargar"
      }
    })
  }

  viewEmployee(id:string){
    this.router.navigate(["viewRestaurant", id])
  }
}
