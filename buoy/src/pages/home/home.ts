import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../../model/user.model';
import { LoginPage } from '../login/login';
import { DeviceProvider } from '../../providers/device/device';
import { Platform } from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { Observable } from 'rxjs/Observable';
import { Device } from '../../model/device.model';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';

declare var google;
var details;
var me$;
var markers = [];
var user;
var number = 0;;

//var unique_array = [];
var map;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  nowUser : string;
  user = {} as User;
  deviceList$ : Observable<Device[]>;
  me$ : string ;
  cord: any;
  lat: any;
  long: any;
  dID: any;
  lats : string;
  latlng : any;
 

  
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
        });


      this.loadMap();
  }

  ionViewWillEnter()
  {
    this.loadMap();
  }
  
  loadMap(){
    this.afAuth.authState.subscribe((res)=>{
      
      me$ = this.afAuth.auth.currentUser.email;
         });
      // array does not exist, is not an array, or is empty
      var array1 = [];
    this.platform.ready().then(()=>{
      this.geolocation.getCurrentPosition().then((resp) => {
        let unique_array = [];

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = 
      {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 

      user = firebase.database().ref('/devices');
        
        //this.countryRef..subscribe(cord=>{
          user.orderByChild("device").on("value" ,function(data)
          {  

          data.forEach(function(snap) {
            var key = snap.val();    
            var lat = key.lat;
            var lng = key.lng;
            var dID = key.device;
            var alrm = key.alarm;

            if(key.email == me$)
            {
              details = {
                lat: lat,
                lng: lng,
                dID: dID,
                alrm: alrm
              };


              if(details.alrm === "0")
                {
                  let latLng = new google.maps.LatLng(details.lat, details.lng);
                   var marker = new google.maps.Marker({
                     position: latLng,
                     map: map,
                     icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                   });
                 let content = `<h4>${details.dID}</h4>`;         

                 let infoWindow = new google.maps.InfoWindow({
                  content: content});
                  google.maps.event.addListener(marker, 'click', () => {
                  infoWindow.open(map, marker);
                  });



                 marker.setMap(map);
                }
              else{
                  let latLng = new google.maps.LatLng(details.lat, details.lng);
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  });

                let content = `<h4>${details.dID}</h4>`;         
                let infoWindow = new google.maps.InfoWindow({
                  content: content});
                  google.maps.event.addListener(marker, 'click', () => {
                  infoWindow.open(map, marker);
                  });
                
                marker.setMap(map);
              }
              number++;















              



            }
          });
          
          
          

        });

          }

)
}
)

  }


  // setMapOnAll(map) {
  //   let unique_array = [];
  //   let new_array = [];

  //   new_array = markers.reverse();
  //   console.log("new", new_array);

  //   for(let i = 0 ;i < new_array.length ; i++){
  //       if(unique_array.indexOf(new_array[i]) == -1){
  //           unique_array.push(new_array[i]);
  //       }
  //   }

  //   console.log("unique", unique_array);
    
  //   for (var k = unique_array.length-1; k > 0; k--) {
  //     unique_array[k].setMap(map);
  //   }

  //   console.log("marker", markers);
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