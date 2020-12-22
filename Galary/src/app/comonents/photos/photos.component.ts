import { Component, OnInit } from '@angular/core';
import { Photo} from '../../models/photo'
import {PhotoService} from '../../services/photo.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageOfFoto } from 'src/app/models/pageOfPhotos';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  selectedImageSource!: SafeResourceUrl | undefined;
  photos:Photo[] | undefined;
  selectedPhoto:Photo|undefined;
  loadedData:boolean = false;
  photoCount :number =0;
  page: number = 1;
  pageSize: number=5;
  totalPages:number=1;

  constructor(private photoService:PhotoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  reloadPhotoListAfterAdd():void{
    this.photoCount++;
    this.totalPages = Math.ceil(this.photoCount / this.pageSize);
    this.page = this.totalPages;
    this.getPhotos();

  }

  photo_url(data: Photo):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.photoData}`);;
  }

  getPhotos():void{
    this.loadedData = true;
    this.photoService.getPhotos(this.page, this.pageSize).subscribe((pageOfFoto: PageOfFoto | any) =>{
      if (pageOfFoto!=null){
        this.loadedData = false;
        this.photos = pageOfFoto?.photos;
        if(this.photos!=null){
          this.photoCount = pageOfFoto.count;
          this.totalPages = Math.ceil(this.photoCount / this.pageSize);
          if (this.photos!.length>0 && (this.selectedImageSource==null || this.selectedImageSource=="")){
            this.selectedImageSource = this.photo_url(this.photos![0]);
          }
        }else{
          this.photoCount = 0;
          this.totalPages = 0;
        }

      }
    });
  }

  nextPage(){
    if(this.page<this.totalPages){
      this.selectedImageSource=""; 
      this.page++;
      this.getPhotos();
    }
  }

  previousPage(){
    if(this.page>1){
      this.selectedImageSource=""; 
      this.page--;
      this.getPhotos();
    }
  }

  showSelectedPhoto(data:Photo):void{
    this.selectedImageSource = this.photo_url(data);
  }

  deletePhotoById(photo:Photo){
    if(confirm("Are you sure to delete this file: "+photo.fileName)) {
      this.photoService.deletePhoto(photo.id).subscribe((response) => {
        this.selectedImageSource=""; 
        this.photoCount--;
        this.totalPages = Math.ceil(this.photoCount / this.pageSize);
        if (this.page>this.totalPages){
          this.page--;
        }
        this.getPhotos();

      });
    }
  }

}
