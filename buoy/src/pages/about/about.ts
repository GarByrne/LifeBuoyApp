import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

long :number ;
lat:number ;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private platform: Platform
  ) { }



  getLocation() {
    this.platform.ready().then(()=>{
        this.geolocation.getCurrentPosition().then((resp) => {
   this.lat = resp.coords.latitude;
   this.long = resp.coords.longitude;
   console.log(this.lat,this.long);
 }).catch((error) => {
     console.log('Error getting location', error);
 });
    })
 }

 

}
