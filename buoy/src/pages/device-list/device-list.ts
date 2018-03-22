import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/observable';
import { Device } from '../../model/device.model';
import { DeviceProvider } from '../../providers/device/device';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
})
export class DeviceListPage {

  deviceList$ : Observable<Device[]>;

  me$ : string ;//= '1garry8@gmail.com';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private deviceProvider: DeviceProvider,
    private afDatabase : AngularFireDatabase,
    private afAuth : AngularFireAuth
  ) {

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

    //gets the current user email
    this.me$ = this.afAuth.auth.currentUser.email;
    console.log(this.me$);


  }



  //this.me$ = this.afAuth.authState.subscribe()

}
