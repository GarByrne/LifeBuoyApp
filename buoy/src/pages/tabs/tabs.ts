import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { DeviceListPage } from '../device-list/device-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DeviceListPage;


  constructor(
    public navCtrl: NavController,
    private afAuth : AngularFireAuth
  ) {}

  logout(){
    this.afAuth.auth.signOut().then
    (()=> this.navCtrl.setRoot(LoginPage));
    }
}
