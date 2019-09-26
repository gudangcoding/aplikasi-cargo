import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage,NavController, Platform, normalizeURL, Content } from 'ionic-angular';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
 
const STORAGE_KEY = 'IMAGE_LIST';


@IonicPage()
@Component({
  selector: 'page-tandatangan',
  templateUrl: 'tandatangan.html',
})
export class TandatanganPage {
 // Canvas stuff
 @ViewChild('imageCanvas') canvas: any;
 canvasElement: any;

 saveX: number;
 saveY: number;

 storedImages = [];

 // Make Canvas sticky at the top stuff
 @ViewChild(Content) content: Content;
 @ViewChild('fixedContainer') fixedContainer: any;

 // Color Stuff
 selectedColor = '#9e2956';

 colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];

 constructor(
   public navCtrl: NavController, 
   private file: File, 
   private storage: Storage, 
   public renderer: Renderer, 
   private plt: Platform
   ) 
  {
   // Load all stored images when the app is ready
   this.storage.ready().then(() => {
     this.storage.get(STORAGE_KEY).then(data => {
       if (data != undefined) {
         this.storedImages = data;
       }
     });
   });
 }

 ionViewDidEnter() {
   // https://github.com/ionic-team/ionic/issues/9071#issuecomment-362920591
   // Get the height of the fixed item
   let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
   let scroll = this.content.getScrollElement();

   // Add preexisting scroll margin to fixed container size
   itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
   scroll.style.marginTop = itemHeight + 'px';
 }

 ionViewDidLoad() {
   // Set the Canvas Element and its size
   this.canvasElement = this.canvas.nativeElement;
   this.canvasElement.width = this.plt.width() + '';
   this.canvasElement.height = 200;
 }

 selectColor(color) {
  this.selectedColor = color;
}
 
startDrawing(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
 
  this.saveX = ev.touches[0].pageX - canvasPosition.x;
  this.saveY = ev.touches[0].pageY - canvasPosition.y;
}
 
moved(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
 
  let ctx = this.canvasElement.getContext('2d');
  let currentX = ev.touches[0].pageX - canvasPosition.x;
  let currentY = ev.touches[0].pageY - canvasPosition.y;
 
  ctx.lineJoin = 'round';
  ctx.strokeStyle = this.selectedColor;
  ctx.lineWidth = 5;
 
  ctx.beginPath();
  ctx.moveTo(this.saveX, this.saveY);
  ctx.lineTo(currentX, currentY);
  ctx.closePath();
 
  ctx.stroke();
 
  this.saveX = currentX;
  this.saveY = currentY;
}
 
 
saveCanvasImage() {
  var dataUrl = this.canvasElement.toDataURL();
 
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
 
  let name = new Date().getTime() + '.png';
  let path = this.file.dataDirectory;
  let options: IWriteOptions = { replace: true };
 
  var data = dataUrl.split(',')[1];
  let blob = this.b64toBlob(data, 'image/png');
 
  this.file.writeFile(path, name, blob, options).then(res => {
    this.storeImage(name);
  }, err => {
    console.log('error: ', err);
  });
}
 
// https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
b64toBlob(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
 
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
 
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
 
    var byteArray = new Uint8Array(byteNumbers);
 
    byteArrays.push(byteArray);
  }
 
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

storeImage(imageName) {
  let saveObj = { img: imageName };
  this.storedImages.push(saveObj);
  this.storage.set(STORAGE_KEY, this.storedImages).then(() => {
    setTimeout(() =>  {
      this.content.scrollToBottom();
    }, 500);
  });
}
 
removeImageAtIndex(index) {
  let removed = this.storedImages.splice(index, 1);
  this.file.removeFile(this.file.dataDirectory, removed[0].img).then(res => {
  }, err => {
    console.log('remove err; ' ,err);
  });
  this.storage.set(STORAGE_KEY, this.storedImages);
}
 
getImagePath(imageName) {
  let path = this.file.dataDirectory + imageName;
  // https://ionicframework.com/docs/wkwebview/#my-local-resources-do-not-load
  path = normalizeURL(path);
  return path;
}

}
