import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Observable } from '@firebase/util';
import { Observable } from 'rxjs/observable';
import { Device } from '../../model/device.model';
import { DeviceProvider } from '../../providers/device/device';

/**
 * Generated class for the DeviceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
})
export class DeviceListPage implements OnInit {

  deviceList$ : Observable<Device[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private deviceProvider: DeviceProvider) {
  }

 ngOnInit() {
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

    console.log(this.deviceList$.subscribe((ret)=>{
      return ret;
    }))
   
 }

}
