import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';



@IonicPage()
@Component({
  selector: 'page-sosmed',
  templateUrl: 'sosmed.html',
})
export class SosmedPage {
  
  services :any ="service";
  posts :any=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private postPvdr : PostProvider,
    private loadingCtrl:LoadingController
    
  )
  {
   
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.load();
  }

  load()
  {
    let body = {
      services : this.services
    }
    this.postPvdr.sosmed(body,"sosmed_service.php").subscribe(data=>{
      console.log(data);
     // this.posts =  this.posts.push(data);
        for(let post of data.data){
          this.posts.push(post); 
        }
    });
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
