import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import{Firebase_config} from './app.firebse.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { DeviceProvider } from '../providers/device/device';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DeviceListPage } from '../pages/device-list/device-list';
import { Geolocation } from '@ionic-native/geolocation';
// import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisterPage,
    LoginPage,
    DeviceListPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Firebase_config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  //  Geolocation
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisterPage,
    LoginPage,
    DeviceListPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceProvider
  ]
})
export class AppModule {}
