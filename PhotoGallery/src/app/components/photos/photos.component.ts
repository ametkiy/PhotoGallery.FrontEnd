import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo} from '../../models/photo'
import { PhotoService} from '../../services/photo.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { PhotoDetailComponent } from '../photo-detail/photo-detail.component';
import { AlbumService } from 'src/app/services/album.service';
import { LikesService } from 'src/app/services/likes.service';

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

  showToastLikedUsers:boolean=false;

  constructor(private photoService:PhotoService, private albumService:AlbumService,
    private likeService:LikesService,
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
      //get photo
      this.photoService.getPhotoFile(this.photos[i].id)
        .subscribe((photo:any) =>{
          if (photo!=null){
            this.photos[i].photoData = photo;
            this.photo_url(this.photos[i]);
          }
        });
      // get info about like
      this.likeService.isUserLikedPhoto(this.photos[i].id)
        .subscribe((result:boolean) => {
          this.photos[i].userIsliked = result;
        })  
    }
  }

  photo_url(data: Photo):any{
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      data.imageToShow = reader.result;
    }, false);
 
    if (data.photoData) {
       reader.readAsDataURL(data.photoData);
    }
    //return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.photoData}`);;
  }

  getPhotosByAlbumId(){
    this.loadedData = true;
    this.albumService.getPhotosByAlbumId(this.page, this.pageSize, this.selectedAlbumID).subscribe((pageOfFoto: any) =>{
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
        this.selectedImageSource=""; 
        this.photoCount--;
        this.totalPages = Math.ceil(this.photoCount / this.pageSize);
        if (this.page>this.totalPages){
          this.page--;
        }
        
        this.refreshPhotoPage();
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
  
  showImagePreview(imageToShow:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {url:imageToShow};

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

  userIsOwner(id:string):boolean{
    let userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    if (userInfo!=null){
      let result = userInfo.id===id;
      return result;
    }else
      return false;
  }

  setLike(photo:Photo){
    this.likeService.setLike(photo.id).subscribe((result:boolean)=>{
      if (result!=null){
        photo.userIsliked = result;
        this.likeService.getPhotoLikesCount(photo.id).subscribe((result:number) =>{
          if (result!=null){
            photo.likesCount = result;
          }
        })
      }
    })
  }

  onMouseOverLike(photo:Photo){
    if (photo.likesCount<1)return;
    this.likeService.getUsersListLikedPhoto(photo.id).subscribe((result:any) => {
      if (result!=null){
        photo.userLikedList = result;
        this.showToastLikedUsers = true;
      }
    })
  }

  getToolTip(photo:Photo):string{
    if (photo.userLikedList==null ||  photo.userLikedList.length<1 )return "";
    let result = "";
    for (let i = 0; i < photo.userLikedList.length; i++) {
      if (result==="")
        result = String(photo.userLikedList[i].fullName);
      else
        result = result + "\n" + String(photo.userLikedList[i].fullName);
      
    }
    return result;
  }

}
