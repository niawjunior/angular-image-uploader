import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filesToUpload: Array<File> = [];
  images;
  showImages;
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploadService.getImages().then(result => {
      this.images = result;
      this.showImages = this.images.data;
    });
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append('uploads[]', files[i], files[i]['name']);
    }
    if (files.length === 0) {
      window.alert('Please choose file to upload!');
    } else {
      this.uploadService.upload(formData).then(() => {
        window.alert('Upload Success!');

      }).catch(() => {
        window.alert('Upload Error!');
      });
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
