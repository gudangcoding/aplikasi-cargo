import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';

/**
 * Generated class for the PulsaregulerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pulsareguler',
  templateUrl: 'pulsareguler.html',
})
export class PulsaregulerPage {
  posts:any=[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private postPvdr: PostProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.load();
  }

  load()
  {
    let body = "";
    this.postPvdr.pulsa(body,"pulsa.php").subscribe(
      data =>{
        console.log(data);
        for(let post of data.message){
          this.posts.push(post); 
        }
      }
    );
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: "Tunggu Sebentar...",
      duration: 1000,
      dismissOnPageChange: true
    });
    loading.present();
  }

}
