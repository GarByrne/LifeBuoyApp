import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Device } from '../../model/device.model';
import { DeviceProvider } from '../../providers/device/device';
import { Geolocation } from '@ionic-native/geolocation';



@IonicPage()
@Component({
  selector: 'page-edit-device',
  templateUrl: 'edit-device.html',
})
export class EditDevicePage implements OnInit {

  device: Device;

  // these need to be set to the current gps cords like before
  currentLat : any;
  currentLong : any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private deviceProvider: DeviceProvider,
    private geolocation: Geolocation,
  ) { }

  ionViewWillLoad() {
   this.device = this.navParams.get('d');
  }

  ngOnInit() {
//might be an issue with getting the gps cords like this, could be beter to 
// getGPD(){
      // From the html button then another button then update
// }

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
      //sets the value of the update variables 
   this.currentLat = data.coords.longitude;
   this.currentLong = data.coords.latitude;
    });
    
  }

  update() {
    console.log('function');

    // this is just setting them to change 
    this.device.lat = this.currentLat;
    this.device.lng = this.currentLong;
    //function in th provider
    //updating this instance of device
    this.deviceProvider.updateDevice(this.device).then(()=>{
      //put in a toast message here to let them know it was updated
    }).then(()=>{
      //navigate back to the map maybe
    })
  }


}
