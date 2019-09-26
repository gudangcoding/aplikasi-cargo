import { DimensiPage } from './../dimensi/dimensi';
import { CargomurahPage } from './../cargomurah/cargomurah';
import { TirexPage } from './../tirex/tirex';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PpobPage } from '../ppob/ppob';
import { NotifikasiPage } from '../notifikasi/notifikasi';
import { ProfilPage } from '../profil/profil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tabDimensi    : any = DimensiPage;
  tabCargoMurah : any = CargomurahPage;
  tabTirex      : any = TirexPage;
  tabPpob       : any = PpobPage;
  tabNotif      : any = NotifikasiPage;
  tabProfil     : any = ProfilPage;
  constructor(public navCtrl: NavController) {

  }

}
