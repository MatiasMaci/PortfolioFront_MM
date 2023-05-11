import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL, UploadTask, FirebaseStorage } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  url: string = "";

  constructor(private storage: Storage) { }
  //private storage: Storage
  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    console.log(file);
  
    const imgRef = ref(this.storage, `imagen/` + name + '/1')
    console.log(imgRef);

    uploadBytes(imgRef, file)
      .then(response => { this.getImages(name) })
      .catch(error => { console.log(error) })
  }
  

  getImages(name:string) {
    
    const imagesRef = ref(this.storage, `imagen/` + name)
    list(imagesRef)
      .then(async response => { 
        console.log(response);
        
        for (let item of response.items) {
          this.url = await getDownloadURL(item);
          console.log("URL: " + this.url);
        }
        
       })
      .catch(error => { console.log(error) })
      
  }
}