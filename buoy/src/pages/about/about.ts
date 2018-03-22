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
    const subscription = this.geolocation.watchPosition()
                              .filter((p) => p.coords !== undefined) //Filter Out Errors
                              .subscribe(position => {
  console.log(position.coords.longitude + ' ' + position.coords.latitude);
  
  this.long = position.coords.longitude;
  this.lat = position.coords.latitude;
});

// To stop notifications
subscription.unsubscribe();
  }

}
