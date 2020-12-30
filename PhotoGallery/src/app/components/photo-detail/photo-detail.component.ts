import { Component, Inject, Input, OnInit } from '@angular/core';
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

  constructor(
    private activeteRoute:ActivatedRoute,
    private location:Location, 
    private photoService:PhotoService,
    private sanitizer: DomSanitizer,
    private dialogBox:MatDialogRef<PhotoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {photo: Photo}) { }

  ngOnInit(): void {

  }

  goBack():void{
    if(this.buttonUptateIsPressed)
      this.dialogBox.close(this.data.photo);
    else
      this.dialogBox.close(null);
  }

  saveDescriptions(){
    this.photoService.updatePhoto(this.data.photo).subscribe((id:any) => {
      if (id!=null && id == this.data.photo.id)
        alert('Update compleate');
      else
        alert('An error occurred while editing');
        this.buttonUptateIsPressed = true;
    });
  }

  photo_url(data: Photo):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.photoData}`);;
  }

  albumChengedEvent(value:any){
    this.data.photo.albumId = value;
  }

}
