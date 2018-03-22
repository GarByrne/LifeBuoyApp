import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { User } from '../../model/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
    this.navCtrl.setRoot(TabsPage);
  }

}
