import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AboutPage } from '../about/about';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../model/user.model';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nowUser : string;

  constructor(
    public navCtrl: NavController,
    private afAuth : AngularFireAuth
  ) {}

  ionViewDidLoad(){
   this.afAuth.authState.subscribe((res)=>{
     console.log(res);
   })
  }
  register(){
    
    this.navCtrl.push(RegisterPage);

  }



}
