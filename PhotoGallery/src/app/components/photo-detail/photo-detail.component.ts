import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import {Photo} from '../../models/photo'

import {ActivatedRoute} from '@angular/router'
import { Location } from '@angular/common';
import {PhotoService} from '../../services/photo.service'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  buttonUptateIsPressed:boolean = false;
  onChangedAlbumList = new EventEmitter();
  photo:Photo= new Photo();

  constructor(
    private activeteRoute:ActivatedRoute,
    private location:Location, 
    private photoService:PhotoService,
    private sanitizer: DomSanitizer,
    private dialogBox:MatDialogRef<PhotoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {photo: Photo}) { }

  ngOnInit(): void {
    this.photo = Object.assign({}, this.data.photo);
  }

  goBack():void{
    if(this.buttonUptateIsPressed)
      this.dialogBox.close(this.data.photo);
    else
      this.dialogBox.close(null);
  }

  saveChangedInPhoto(){
    this.photoService.updatePhoto(this.photo).subscribe((id:any) => {
      if (id!=null && id == this.data.photo.id){
        this.data.photo = Object.assign({}, this.photo);
        alert('Update compleate');
      }
      else
        alert('An error occurred while editing');
        this.buttonUptateIsPressed = true;
    });
  }

  photo_url(data: Photo):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.photoData}`);;
  }

  albumChengedEvent(value:any){
    if (value!=null)
      this.photo.albumId = value;
    this.onChangedAlbumList.emit();
  }

}
