import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storage: Storage,
    private appCtrl : App
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //ambil nilai session dari storage yang disisipkan saat login berhasil
    this.storage.get('member').then((res)=>{
      console.log(res);
      if(res==null){
        this.rootPage = LoginPage;
      }else{
        this.rootPage = HomePage;
      }
    });
  }


  logout(){
    this.storage.clear();
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}

