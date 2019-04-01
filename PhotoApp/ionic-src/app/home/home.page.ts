import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

// Native Plugins for accessing device speific features

import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  posts: any = [];
  url = "http://192.168.1.2:8888/test/";
  constructor(public http: Http, public route: Router, public camera: Camera, public ft: FileTransfer, public alert: AlertController) { }

  ngOnInit() {
    this.getFeed()
  }

  getFeed() {
    this.posts = [];
    this.http.get(this.url + "api.php/records/photos").subscribe(data => {
      let res = JSON.parse(data["_body"]);
      this.posts = res.records;
    })
  }

  goDetail(post) {
    this.route.navigate(['/details', post])
  }

  openImagePicker() {
    // open image picker
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50
    }).then(img => {
      this.uploadImageToServer(img);
    }).catch(err => console.log(err));
  }

  uploadImageToServer(img) {

    let ftObj: FileTransferObject = this.ft.create();

    ftObj.upload(img, this.url + "upload.php").then(uploadRes => {
      if (uploadRes.response != "error")
        this.insertData(uploadRes.response)
    }).catch(uploadErr => console.log(uploadErr))
  }


  async insertData(filepath) {
    const alert = await this.alert.create({
      message: 'Enter Name',
      inputs: [{ name: 'filename', type: 'text' }],
      buttons: [{
        text: 'ok',
        handler: (data) => {

          this.http.post(this.url + "api.php/records/photos", { "title": data.filename, "path": this.url+"uploads/"+filepath }).subscribe(data => {
            this.getFeed();
          });

        }
      }]
    })
    await alert.present();
  }

}
