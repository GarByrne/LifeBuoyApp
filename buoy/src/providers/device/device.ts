import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../../model/device.model';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceProvider {

  private deviceListReference = this.afDatabase.list<Device>('device');

  constructor(private afDatabase : AngularFireDatabase) {
    console.log('Hello DeviceProvider Provider');
  }

  getDevice(){
    console.log(this.deviceListReference);
    return this.deviceListReference;


  }

}
