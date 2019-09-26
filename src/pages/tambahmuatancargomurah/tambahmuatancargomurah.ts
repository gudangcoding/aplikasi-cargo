import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { CargomurahinboundPage } from '../cargomurahinbound/cargomurahinbound';


@IonicPage()
@Component({
  selector: 'page-tambahmuatancargomurah',
  templateUrl: 'tambahmuatancargomurah.html',
})
export class TambahmuatancargomurahPage {
  
  datakirim: any = [];
  no_resi: any;
  resi: any;
  jenis_barang: any;
  deskripsi_barang: any;
  jumlah: any;
  panjang: string;
  lebar: string;
  tinggi: string;
  berat_volume: any;
  berat_aktual: any;
  berat_pakai: any;
  sub_total: any;
  harga: any;
  post: any;
  tarif: any;
  biaya_pickup: any;
  jenis_packaging: any;
  biaya_packaging: any;
  packaging: any;
  grandtotal: any;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private postPvdr: PostProvider,
    public toastCtrl:ToastController) {
    this.no_resi = this.navParams.get('no_resi');
    this.tarif = this.navParams.get('tarif');
  }



  ionViewDidLoad() {
    
    this.load();
    this.tarif = parseFloat(this.post.tarif);
    this.no_resi = this.post.no_resi;
  }
  ganti() {
    //hitung berat volume
    if (this.berat_volume != NaN) {
      this.berat_volume = ((parseFloat(this.panjang) * parseFloat(this.lebar) * parseFloat(this.tinggi)) * this.jumlah) / 4000;
    } else {
      console.log('Belum Lengkap');
    }
    //cek untuk berat yang digunakan dengan membandingkan berat aktual dan berat volume
    if (this.berat_aktual > this.berat_volume) {
      this.berat_pakai = this.berat_aktual;
    } else {
      this.berat_pakai = this.berat_volume;
    }
    //hitung sub_total barang
    this.sub_total = this.harga * this.berat_pakai;
    //penentuan biaya pickup
    if (this.berat_pakai < 500) {
      this.biaya_pickup = 150000;
    } else {
      this.biaya_pickup = 0;
    }
    this.sub_total = this.harga * this.berat_pakai + this.biaya_pickup;
    //cek biaya packaging
    if (this.jenis_packaging == 'Wrap Plastic') {
      this.biaya_packaging = (parseFloat(this.panjang) + parseFloat(this.lebar) + parseFloat(this.tinggi)) / 3 * 2000;
    } else if (this.jenis_packaging == 'Vallet Kayu') {
      this.biaya_packaging = (parseFloat(this.panjang) + parseFloat(this.lebar) + parseFloat(this.tinggi)) / 3 * 5000;
    } else {
      this.biaya_packaging = 0;
    }

    this.sub_total = this.harga * this.berat_pakai;
    this.grandtotal = this.harga * this.berat_pakai + this.biaya_pickup + this.biaya_packaging;

  }

  berataktual() {
    //cek untuk berat yang digunakan dengan membandingkan berat aktual dan berat volume
    if (this.berat_aktual > this.berat_volume) {
      this.berat_pakai = this.berat_aktual;
    } else {
      this.berat_pakai = this.berat_volume;
    }
    //hitung sub_total barang
    this.sub_total = this.harga * this.berat_pakai;
    //penentuan biaya pickup
    if (this.berat_pakai < 500) {
      this.biaya_pickup = 150000;
    } else {
      this.biaya_pickup = 0;
    }
    this.sub_total = this.harga * this.berat_pakai;
    this.grandtotal = this.harga * this.berat_pakai + this.biaya_pickup + this.biaya_packaging;

  }

  pilihpackaging() {
    //cek biaya packaging
    if (this.jenis_packaging == 'Wrap Plastic') {
      this.biaya_packaging = (parseFloat(this.panjang) + parseFloat(this.lebar) + parseFloat(this.tinggi)) / 3 * 2000;
    } else if (this.jenis_packaging == 'Vallet Kayu') {
      this.biaya_packaging = (parseFloat(this.panjang) + parseFloat(this.lebar) + parseFloat(this.tinggi)) / 3 * 5000;
    } else {
      this.biaya_packaging = 0;
    }
    
    this.grandtotal = this.harga * this.berat_pakai + this.biaya_pickup + this.biaya_packaging;
  }

  load() {
    let body = {
      no_resi: this.no_resi
    }
    this.postPvdr.postData(body, 'tambah_muatan.php').subscribe(data => {
      console.log(data);
      for (let post of data.result) {
        this.datakirim.push(post);
      }
    });
  }

  simpan_muatan() {
    return new Promise(resolve => {    
    let body = {
      no_resi: this.no_resi,
      jenis_barang: this.jenis_barang,
      deskripsi_barang: this.deskripsi_barang,
      jumlah: this.jumlah,
      panjang: this.panjang,
      lebar: this.lebar,
      tinggi: this.tinggi,
      berat_volume: this.berat_volume,
      berat_aktual: this.berat_aktual,
      berat_pakai: this.berat_pakai,
      harga: this.harga,
      sub_total: this.sub_total,
      biaya_pickup: this.biaya_pickup,
      biaya_packaging: this.biaya_packaging,
      jenis_packaging: this.jenis_packaging,
      grandtotal: this.grandtotal
    }

    
    this.postPvdr.postData(body, 'simpan_muatan.php').subscribe(data => {
      console.log(data);
      if (data.success == true) {
        this.navCtrl.push(CargomurahinboundPage);
        this.showToast('top','Data Berhasil Disimpan');
      } else {
        this.showToast('top','Data Gagal Disimpan');
        console.log('Gagal Simpan Data');
      }
    });
  });
  }

  showToast(position:string, message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position,
      cssClass: "warnatoast",
    });
    toast.present(toast);
  }

}
