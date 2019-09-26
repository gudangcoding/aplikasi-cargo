import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder, NativeGeocoderReverseResult,NativeGeocoderOptions} from '@ionic-native/native-geocoder';

declare var google;

@IonicPage()
@Component({
  selector: 'page-rute',
  templateUrl: 'rute.html',
})
export class RutePage {
   map: any;
   infoWindow: any;
   alamat: string;
   subAdministrativeArea: string;
   postalCode: number;
   locality: string;
   subLocality: string;
   subThoroughfare: string;
   countryCode: string;
   countryName: string;
   administrativeArea: string;
   thoroughfare: string

   @ViewChild('map') mapElement: ElementRef;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private geolocation: Geolocation, 
     private nativeGeocoder: NativeGeocoder
     ) {
  }

  ionViewDidLoad(){
    console.log("rute diload");
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
     
      //untuk mengubah koordinat jadi alamat
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
      this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude,options)
        .then((result: NativeGeocoderReverseResult[]) =>
        
        {
          
          let jln = JSON.stringify(result[0].thoroughfare);
          let desa = JSON.stringify(result[1].subThoroughfare);
          let kec = JSON.stringify(result[2].subLocality);
          let kab = JSON.stringify(result[3].locality);

          this.alamat = jln+", "+desa+", "+kec+", "+kab;
          console.log(this.alamat);
        })
        .catch((error: any) => console.log(error));
        
        
    }, (err) => {
      console.log(err);
    });

    //untuk mengembalikan alamat jadi koordinat
    /*let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.forwardGeocode('Berlin', options)
    .then((result: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
    .catch((error: any) => console.log(error));
    */
 
  }

}
