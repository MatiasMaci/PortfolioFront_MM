import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  url: string = "";

  constructor() { }
  //private storage: Storage
  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    console.log(file);
/*    const imgRef = ref(this.storage, `imagen/`+ name)
    uploadBytes(imgRef, file)
      .then(response => {this.getImages()})
      .catch(error => {console.log(error)})
*/
  }

  getImages() {
    /*
    const imagesRef = ref(this.storage, `imagen`)
    list(imagesRef)
      .then(async response => { 
        for (let item of response.items) {
          this.url = await getDownloadURL(item);
          console.log("URL: " + this.url);
        }
       })
      .catch(error => { console.log(error) })
      */
  }
}