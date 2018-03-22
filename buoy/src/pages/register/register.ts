import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../model/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth : AngularFireAuth,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
   registerUser(){

    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(()=> this.navCtrl.setRoot(TabsPage));

   }



}
