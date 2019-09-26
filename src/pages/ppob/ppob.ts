import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PulsaplnPage } from '../pulsapln/pulsapln';
import { PulsaregulerPage } from '../pulsareguler/pulsareguler';
import { GamePage } from '../game/game';
import { SosmedPage } from '../sosmed/sosmed';
/**
 * Generated class for the PpobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ppob',
  templateUrl: 'ppob.html',
})
export class PpobPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PpobPage');
  }

  pulsapln()
  {
    this.navCtrl.push(PulsaplnPage);
  }

  pulsaReguler()
  {
    this.navCtrl.push(PulsaregulerPage);
  }

  game()
  {
    this.navCtrl.push(GamePage);
  }
  sosmed()
  {
    this.navCtrl.push(SosmedPage);
  }

}
