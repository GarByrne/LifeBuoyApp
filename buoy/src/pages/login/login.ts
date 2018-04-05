import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { User } from '../../model/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  errorMessage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth) {
  }


  //remove this
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //this can be removed and use a nav . push in th html if you want
  registerPage() {
    this.navCtrl.push(RegisterPage);
  }


  //fix to the login 
  loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email.valueOf(), this.user.password.valueOf())
    .then(data =>{
      if(data){
        console.log('Here');
        this.navCtrl.setRoot(TabsPage);
      }else{
        console.log( Error , 'Not Here');
      }
    },
              error => {
                  this.errorMessage = (<any>error);
  
                  // Here you can show a toast when an error has ocurred!
                  // ...
                  console.log('there has been an error here')
  
              });  
  }

}
