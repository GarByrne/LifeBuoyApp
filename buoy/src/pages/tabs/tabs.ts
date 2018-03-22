import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
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
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = DeviceListPage;


  constructor(
    public navCtrl: NavController,
    private afAuth : AngularFireAuth
  ) {}

  logout(){
    this.afAuth.auth.signOut().then
    (()=> this.navCtrl.setRoot(LoginPage));
    }
}
