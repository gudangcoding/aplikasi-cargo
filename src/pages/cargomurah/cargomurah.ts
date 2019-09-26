import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CargomurahinboundPage } from '../cargomurahinbound/cargomurahinbound';
import { CargomurahoutboundPage } from '../cargomurahoutbound/cargomurahoutbound';
import { BarcodePage } from '../barcode/barcode';
import { CargomurareportPage } from '../cargomurareport/cargomurareport';
import { CetakbarcodePage } from '../cetakbarcode/cetakbarcode';
import { RutePage } from '../rute/rute';
//import { MapPage } from '../map/map';



@IonicPage()
@Component({
  selector: 'page-cargomurah',
  templateUrl: 'cargomurah.html',
})
export class CargomurahPage {
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams)
     {
      
  }

  

  ionViewDidLoad(){
    console.log("Cargo Murah Di Load");
  }

  inbound()
  {
    this.navCtrl.push(CargomurahinboundPage);
  }

  outbound()
  {
    this.navCtrl.push(CargomurahoutboundPage);
  }

  barcode()
  {
    this.navCtrl.push(BarcodePage);
  }

  report()
  {
    this.navCtrl.push(CargomurareportPage);
  }

  cetakBarcode(){
    this.navCtrl.push(CetakbarcodePage);
  }

  rute()
  {
    this.navCtrl.push(RutePage);
  }

}
