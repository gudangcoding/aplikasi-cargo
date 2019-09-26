import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StarPRNT } from '@ionic-native/star-prnt';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/post-provider';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { TambahmuatancargomurahPage } from '../tambahmuatancargomurah/tambahmuatancargomurah';
import { TandatanganPage } from '../tandatangan/tandatangan';

@IonicPage()
@Component({
  selector: 'page-cargomurahinbound',
  templateUrl: 'cargomurahinbound.html',
})
export class CargomurahinboundPage {
  //inisiasi variable
  anggota: any;
  server: string;
  posts: any = [];
  start: number = 0;
  perpage: number = 5;
  tarif:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage : Storage,
    private postPvdr: PostProvider,
    private launchNavigator: LaunchNavigator,
    private starprnt: StarPRNT
    )
     {
      this.server = postPvdr.server;
      
  }
  //tarik data dari rest-api
  load(){    
    return new Promise(resolve => {  
      let body = {
        username : this.anggota.username,
        password : this.anggota.password,
        id: this.anggota.id,
        start: this.start,
        limit: this.perpage
      };

      this.postPvdr.postData(body, 'pengiriman.php').subscribe(data => {

        for(let post of data.result){
          this.posts.push(post); 
        }
        resolve(true);
      });
    });
  }
  
  //pagination halaman
  doInfinite(event:any) {
     this.start += this.perpage;   
     this.load().then(()=>{
      event.complete();
     });
  }
  //arahkan ke maps rute jemput
  rutejemput(address)
  {
    this.launchNavigator.navigate(address);
    
  }


  wa(){
    
  }

  //page diload
  ionViewDidLoad(){
    this.posts = [];
    this.start = 0;
    this.storage.get('member').then((res)=>{
      this.anggota = res;
      this.load();
    });
  }

  printBarcode()
  {
    this.starprnt.portDiscovery('all')
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
  }

  tambahMuatan(id,tarif)
  {
    this.navCtrl.push(TambahmuatancargomurahPage,{
      'no_resi':id,
      'tarif': tarif
    });
  }

  tandaTangan()
  {
    this.navCtrl.push(TandatanganPage);
  }

 

}
