import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/observable';
import { Device } from '../../model/device.model';
import { DeviceProvider } from '../../providers/device/device';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
})
export class DeviceListPage implements OnInit{

  deviceList$ : Observable<Device[]>;

  me$ : string ;//= '1garry8@gmail.com';

  public countryList:Array<any>;
public loadedCountryList:Array<any>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private deviceProvider: DeviceProvider,
    private afDatabase : AngularFireDatabase,
    private afAuth : AngularFireAuth
  ) { 
    this.initializeItems();
  }
  
  initializeItems(){
    this.countryList = this.loadedCountryList;
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = ev.target.value;
    console.log("q", q);
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.countryList = this.countryList.filter((v) => {
      if(v.device && q) {
        if (v.device.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.countryList.length);
  
  }

ngOnInit(){
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
      let countries = []; 
      cord.forEach(function(snap) {

        
        countries.push(snap);
        return false;
     
          
          
        
      });
      console.log(countries);
      this.countryList = countries;
      this.loadedCountryList = countries;
    });


    //gets the current user email
    this.me$ = this.afAuth.auth.currentUser.email;
    console.log(this.me$);
    console.log(this.deviceList$);

}




  


}
