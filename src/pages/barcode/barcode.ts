import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CetakbarcodePage } from '../cetakbarcode/cetakbarcode';
import { PostProvider } from '../../providers/post-provider';

@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {
  barcode:string;
  posts:any=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private postPvdr: PostProvider,
    private alertCtrl : AlertController
    ) {
  }

  ionViewDidEnter() {
    this.scanBarcode();
  }

  scanBarcode()
  {
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData['text'];
      console.log('Barcode data', this.barcode);
      let body={
        no_resi : this.barcode
      }

      this.postPvdr.postData(body,"cekbarang.php").subscribe(data=>{
        if(data){
          for(let post of data.result){
            this.posts.push(post); 
          }
        }else{
          this.doAlert();
        }
        
      });

     }).catch(err => {
         this.barcode=JSON.stringify(err);
     });
  }

  kePrinter()
  {
    this.navCtrl.push(CetakbarcodePage);
  }

  doAlert() 
  {
    let alert = this.alertCtrl.create({
      title: 'Info',
      message: 'Resi Tidak Ditemukan',
      buttons: ['Ok']
    });
    alert.present()
  }

}
