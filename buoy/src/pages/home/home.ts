import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../../model/user.model';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Device } from '../../model/device.model';
import { mapStyle } from './mapStyle';

import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

declare var google;
declare var FCMPlugin;
var date2;
var num1;
var details;
var array = [];
var me$;
var user;
var found = false;
var deviceEntries;
var map;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  firestore = firebase.database().ref('/pushtokens');


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
    public afd: AngularFireDatabase,
  ) {

    this.tokensetup().then((token) => {
      this.storetoken(token);
    })
  }

  ngOnInit(){
    this.afAuth.authState.subscribe((res)=>{
      
     this.me$ = this.afAuth.auth.currentUser.email;
        });


      this.loadMap();
  }

  ionViewWillEnter()
  {
    this.loadMap()
  }


ionViewDidLoad(){


  FCMPlugin.onNotification(function(data){
    if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.
      alert( JSON.stringify(data) );
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      alert( JSON.stringify(data) );
    }
    });

FCMPlugin.onTokenRefresh(function(token){
    alert( token );
});    
  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
    resolve(token);
      }, (err) => {
        reject(err);
});
    })
    return promise;
  }

  storetoken(t) 
  {
    deviceEntries = firebase.database().ref('/pushtokens');
        
      deviceEntries.orderByChild("uid").on("value" ,function(data)
          {

            data.forEach(function(snap)
            {
              var result = snap.val();
              if(result.uid == firebase.auth().currentUser.uid)
              {
                found = true;
              }
              
            })
            runAfterQuery(found);

           })
  
function runAfterQuery(f)
{
  if(f == false)
  {
    
    firebase.database().ref('pushtokens/' + firebase.auth().currentUser.uid).set({
      uid:firebase.auth().currentUser.uid,
      devtoken: t,
      email: me$
    });

  }
  else{
    firebase.database().ref("pushtokens/"+firebase.auth().currentUser.uid).update({ devtoken: t });

  }



}
 
}

  
  loadMap(){
    this.afAuth.authState.subscribe((res)=>{
      
      me$ = this.afAuth.auth.currentUser.email;
         });
    this.platform.ready().then(()=>{
      this.geolocation.getCurrentPosition().then((resp) => {

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = 
      {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles:  mapStyle
      }
      
      map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 

      user = firebase.database().ref('/devices');

          user.orderByChild("device").on("value" ,function(data)
          {  


          data.forEach(function(snap) {

            var key = snap.val();  
            var lat = key.lat;
            var lng = key.lng;
            var dID = key.deviceID;
            var alrm = key.alarm;

            if(key.email == me$)
            {
              details = {
                lat: lat,
                lng: lng,
                dID: dID,
                alrm: alrm
              };


              if(details.alrm === "00000000")
                {
                  let latLng = new google.maps.LatLng(details.lat, details.lng);
                   var marker = new google.maps.Marker({
                     position: latLng,
                     map: map,
                     style:{
                       color: "red"
                     },
                     icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                   });
                 let content = `<h4>Device ID: ${details.dID}</h4>`;         

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

                let content = `<h4>Device ID: ${details.dID}</h4>`;         
                let infoWindow = new google.maps.InfoWindow({
                  content: content});
                  google.maps.event.addListener(marker, 'click', () => {
                  infoWindow.open(map, marker);
                  });
                
                marker.setMap(map);
              }

            }
          });
          
        });

          }

)
}
)

  }

   addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }
  }