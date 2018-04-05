import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../../model/user.model';
import { LoginPage } from '../login/login';
import { DeviceProvider } from '../../providers/device/device';
import { Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { Observable } from 'rxjs/Observable';
import { Device } from '../../model/device.model';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  nowUser : string;
  deviceList$ : Observable<Device[]>;
  me$ : string ;
  cord: any;
  lat: any;
  long: any;
  dID: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor( public geolocation: Geolocation,
    public navCtrl: NavController,
    private afAuth : AngularFireAuth,
    private platform: Platform,
    private deviceProvider: DeviceProvider,

  ) {}

  ngOnInit(){
    this.afAuth.authState.subscribe((res)=>{
      
      this.me$ = this.afAuth.auth.currentUser.email;
      console.log(this.me$);
            
        });

        this.loadMap();

      this.deviceList$ = this.deviceProvider
      .getDevice()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c=>({
            key:c.payload.key,
            ...c.payload.val(),
          }));
        });   
        this.deviceList$.subscribe(cord=>{
          
        cord.forEach(function(snap) {
          var lat = snap.lat;
          var lng = snap.lng;
          var dID = snap.device;
          //this.test = this.me$;
         // console.log(this.test , "test");

          if(snap.email === "1garry8@gmail.com")
          {

            var myLatLng = {lat, lng};

 
          let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: myLatLng,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
             
              //let content = "<h4>Information!</h4>";         
             
              //this.addInfoWindow(marker, content);
             
            
          }

          
            });


        //gets the current user email
        this.me$ = this.afAuth.auth.currentUser.email;
        console.log(this.me$);
    })
    
  }

  // ionViewDidLoad(){
  // //  this.afAuth.authState.subscribe((res)=>{
  // //    console.log(res);
  // //    this.loadMap();
  //  })
  // }
  
  loadMap(){
 
    this.platform.ready().then(()=>{
      this.geolocation.getCurrentPosition().then((resp) => {



 let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
 let mapOptions = {
   center: latLng,
   zoom: 15,
   mapTypeId: google.maps.MapTypeId.ROADMAP
 }


 this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: latLng,
  icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
});
    let content = "<h4>Current Location</h4>";         
    this.addInfoWindow(marker, content);

}).catch((error) => {
   console.log('Error getting location', error);
});
  })

 
  }


  // addMarker(lat,lng,device){
 
  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: this.map.getCenter(),
  //     icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  //   });
   
  //   //let content = "<h4>Information!</h4>";         
   
  //   //this.addInfoWindow(marker, content);
   
  // }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }


}
