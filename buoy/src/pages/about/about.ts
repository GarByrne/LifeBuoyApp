import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

long :number ;
lat:number ;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) { }



  

  getLocation(){
this.geolocation.getCurrentPosition().then((resp) => {
     resp.coords.latitude
     resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
     data.coords.latitude
    this.long = data.coords.longitude;
    this.lat = data.coords.latitude;
   });

   console.log(this.long);
   console.log(this.lat);

}

}
