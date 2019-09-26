import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage'
import { File } from '@ionic-native/file/ngx';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostProvider } from '../providers/post-provider';
import { LoginPage } from '../pages/login/login';
import { CargomurahPage } from '../pages/cargomurah/cargomurah';
import { TirexPage } from '../pages/tirex/tirex';
import { DimensiPage } from '../pages/dimensi/dimensi';
import { PpobPage } from '../pages/ppob/ppob';
import { NotifikasiPage } from '../pages/notifikasi/notifikasi';
import { ProfilPage } from '../pages/profil/profil';
import { BarcodePage } from '../pages/barcode/barcode';
import { RutePage } from '../pages/rute/rute';
import { PulsaplnPage } from '../pages/pulsapln/pulsapln';
import { PulsaregulerPage } from '../pages/pulsareguler/pulsareguler';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CargomurahinboundPage } from '../pages/cargomurahinbound/cargomurahinbound';
import { CargomurahoutboundPage } from '../pages/cargomurahoutbound/cargomurahoutbound';
import { CargomurareportPage } from '../pages/cargomurareport/cargomurareport';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { StarPRNT } from '@ionic-native/star-prnt';
import { TambahmuatancargomurahPage } from '../pages/tambahmuatancargomurah/tambahmuatancargomurah';
import { TandatanganPage } from '../pages/tandatangan/tandatangan';
import { GamePage } from '../pages/game/game';
import { CetakbarcodePage } from '../pages/cetakbarcode/cetakbarcode';
import { PrintProvider} from '../providers/print/print';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SosmedPage } from '../pages/sosmed/sosmed';
import { PrinterListModalPage } from '../pages/printer-list-modal/printer-list-modal';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CargomurahPage,
    TirexPage,
    DimensiPage,
    PpobPage,
    NotifikasiPage,
    ProfilPage,
    BarcodePage,
    RutePage,
    PulsaplnPage,
    PulsaregulerPage,
    CargomurahinboundPage,
    CargomurahoutboundPage,
    CargomurareportPage,
    TambahmuatancargomurahPage,
    TandatanganPage,
    GamePage,
    CetakbarcodePage,
    SosmedPage,
    PrinterListModalPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CargomurahPage,
    TirexPage,
    DimensiPage,
    PpobPage,
    NotifikasiPage,
    ProfilPage,
    BarcodePage,
    RutePage,
    PulsaplnPage,
    PulsaregulerPage,
    CargomurahinboundPage,
    CargomurahoutboundPage,
    CargomurareportPage,
    TambahmuatancargomurahPage,
    TandatanganPage,
    GamePage,
    CetakbarcodePage,
    SosmedPage,
    PrinterListModalPage,
    MapPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostProvider,
    BarcodeScanner,
    Geolocation,
    LaunchNavigator,
    StarPRNT,
    File,
    PrintProvider,
    BluetoothSerial,
    NativeGeocoder,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
