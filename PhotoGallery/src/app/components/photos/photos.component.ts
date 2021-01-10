import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo} from '../../models/photo'
import { PhotoService} from '../../services/photo.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { PhotoDetailComponent } from '../photo-detail/photo-detail.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  @Input() selectedAlbumID:any = '00000000-0000-0000-0000-000000000000';
  @Output() updateAlbumList = new EventEmitter();

  selectedImageSource!: SafeResourceUrl | undefined;
  photos:Photo[] = [];
  selectedPhoto:Photo|undefined;
  loadedData:boolean = false;
  photoCount :number = 0;
  page: number = 1;
  pageSize: number = 10;
  totalPages:number = 1;

  constructor(private photoService:PhotoService, 
    private sanitizer: DomSanitizer, 
    private dialog:MatDialog) { }

  ngOnInit(): void {
    if (location.pathname == '/photos')
      this.getPhotos();
  }

  ngOnChanges(){
    this.getPhotosByAlbumId()
  }

  reloadPhotoListAfterAdd(addedFilesCount:number):void{
    this.photoCount = this.photoCount + addedFilesCount;
    this.totalPages = Math.ceil(this.photoCount / this.pageSize);
    this.page = this.totalPages;
    this.refreshPhotoPage();
  }

  photo_url(data: Photo):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.photoData}`);;
  }

  getPhotos():void{
    this.loadedData = true;
    this.photoService.getPhotos(this.page, this.pageSize).subscribe((pageOfFoto: any) =>{
      if (pageOfFoto==null){
        this.photoCount = 0;
        this.totalPages = 0;
      }else{
        this.loadedData = false;
        this.photos = pageOfFoto?.data;
        this.photoCount = pageOfFoto.totalCount;
        this.totalPages = Math.ceil(this.photoCount / this.pageSize);
        if(this.photos!=null && this.photos.length>0)
          this.getBinaryDataForPhotos();
      }
    });
  }

  getBinaryDataForPhotos(){
    for(let i=0; i<this.photos.length;i++){
      this.photoService.getPhoto(this.photos[i].id)
        .subscribe(photo =>{
          if (photo!=null){
            this.photos[i].tags = photo.tags;
            this.photos[i].photoData = photo.photoData;
            if (i==0){
              this.selectedImageSource = this.photo_url(this.photos[i]);
            }
          }
        });
    }
  }

  getPhotosByAlbumId(){
    this.loadedData = true;
    this.photoService.getPhotosByAlbumId(this.page, this.pageSize, this.selectedAlbumID).subscribe((pageOfFoto: any) =>{
      if (pageOfFoto==null){
        this.photoCount = 0;
        this.totalPages = 0;
      }else{
        this.loadedData = false;
        this.photos = pageOfFoto?.data;
        this.photoCount = pageOfFoto.totalCount;
        this.totalPages = Math.ceil(this.photoCount / this.pageSize);
        if(this.photos!=null && this.photos.length>0)
          this.getBinaryDataForPhotos();
      }
    });
  }


  deletePhotoById(photo:Photo){
    if(confirm("Are you sure to delete this file: "+photo.fileName)) {
      this.photoService.deletePhoto(photo.id).subscribe((response) => {
        if (response == photo.id){
          this.selectedImageSource=""; 
          this.photoCount--;
          this.totalPages = Math.ceil(this.photoCount / this.pageSize);
          if (this.page>this.totalPages){
            this.page--;
          }
          this.refreshPhotoPage();
        }else
          alert("Cann't delete photo")

      });
    }
  }

  onLastPageClick(){
    this.page = this.totalPages;
    this.refreshPhotoPage();
  }

  onFirstPageClick(){
    this.page = 1;
    this.refreshPhotoPage();
  }

  nextPage(){
    if(this.page<this.totalPages){
      this.selectedImageSource=""; 
      this.page++;
      this.refreshPhotoPage();
    }
  }

  previousPage(){
    if(this.page>1){
      this.selectedImageSource=""; 
      this.page--;
      this.refreshPhotoPage();
    }
  }

  pageNumber(i:number){
    this.page = i+1;
    this.refreshPhotoPage();
  }

  refreshPhotoPage(){
    if (location.pathname == '/photos')
      this.getPhotos();
    else{
      if (location.pathname == '/albums')
        this.getPhotosByAlbumId();
    }
  }
  
  showImagePreview(url:SafeResourceUrl){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {url:url};

    let dialogRef = this.dialog.open(ImagePreviewComponent, dialogConfig);
  }

  showDitailForm(index:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {photo:this.photos[index]};

    let dialogRef = this.dialog.open(PhotoDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result==null) return;
      if (location.pathname == '/albums' && result!=null && this.photos[index].albumId != this.selectedAlbumID){
        this.getPhotosByAlbumId();
      }else{
        this.photos[index].albumId = result.albumId;
        this.photos[index].description = result.description;
        this.photos[index].tags = result.tags;
      }
    });

    const sub = dialogRef.componentInstance.onChangedAlbumList.subscribe(() => {
      this.updateAlbumList.emit();
    });
  }

  isActivePage(i:number):boolean{
    let result = i==this.page;
    return result;
  }

  disabledFirstPreviousPage():boolean{
    return this.page==1;
  }

  disabledNextLastPage():boolean{
    return this.page == this.totalPages;
  }
}
