import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/post-provider';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public navCtrl: NavController, 
    private storage: Storage,
    private alertCtrl: AlertController,
    private postPvdr: PostProvider) {

  }

  cekLogin(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      if(this.username != "" && this.password != ""){
        let body = {
          username: this.username,
          password: this.password
        };

        this.postPvdr.postData(body, 'login.php').subscribe((data) => {
          if(data.success){
             this.storage.set('member', data.result);
             this.navCtrl.setRoot(HomePage);
          }
          else this.alert('Error', data.msg);
          console.log(data);
        });
      }else{
        this.alert('Error', 'Username atau Password kosong!');
      }
    }else{
      this.alert('Error', 'Username tidak valid!');
    }
  }

 

  alert(title: string, message: string){
    let alertBox = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    alertBox.present();    
  }


}
