import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  loggedIn;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, public toastCtrl:ToastController ) {
  }
  ngOnInit() {
    this.loggedIn = this.afAuth.authState.subscribe((data)=>{
      if(data) {
        // User is signed in.
        console.log('is user');
          this.navCtrl.setRoot(TabsPage);
        
      }else{
        console.log('is not user')
        // No user is signed in.
      }
  
    });
  
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
  loginUser(user: User) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email.valueOf(), user.password.valueOf())
    .then( () => {
      console.log( 'Success');
      console.log('Found You');
      
        this.navCtrl.setRoot(TabsPage);
      
      //success
    }, (err) => {
      // Do something with error
      console.log(err.message, 'failed');
      console.log('Nobodys here');
      let toast = this.toastCtrl.create({
        message: `Woops!!!!!!!!!!! 
        Something has gone wrong, Try entering the information again?`,
        duration: 6000,
        position: 'bottom',
        showCloseButton: true,
        dismissOnPageChange: true,
      });
      toast.present();
    })
  }

}
