import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  async upload(file) {
    return await this.http
      .post('http://localhost:3000/upload', file)
      .toPromise()
      .then(result => {
        return result;
      });
  }
  async getImages() {
    return await this.http
      .get('http://localhost:3000/images')
      .toPromise()
      .then(result => {
        return result;
      });
  }
}
