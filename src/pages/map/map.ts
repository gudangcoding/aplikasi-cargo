import {Component, ViewChild, ElementRef} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';

declare var google;
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;
   infoWindow: any;
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private geolocation: Geolocation
    ) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){ 
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
 	    //Menampilkan peta
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //Menambah marker
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        position: this.map.getCenter()
      });
     
      //Membuat info window
      this.infoWindow = new google.maps.InfoWindow({
        content: "Information"
      });

      //Menampilkan info window ketika marker diklik
      google.maps.event.addListener(marker, 'click', () => {
        this.infoWindow.open(this.map, marker);
      });
     
     
        
    }, (err) => {
      console.log(err);
    });
 
  }

}
