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
  selectedImageSource!: SafeResourceUrl | undefined;
  photo!: Photo ;
  buttonUptateIsPressed:boolean = false;

  constructor(
    private activeteRoute:ActivatedRoute,
    private location:Location, 
    private photoService:PhotoService,
    private sanitizer: DomSanitizer,
    private dialogBox:MatDialogRef<PhotoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

  ngOnInit(): void {
    let id ;
    if (this.data.id!=null){
      id = this.data.id;
      this.photoService.getPhoto(id)
        .subscribe(photo =>{
          this.photo = photo;
      });
    }
    else{
      alert('Id is empty');
      this.goBack();
    }
  }

  goBack():void{
    this.dialogBox.close(this.buttonUptateIsPressed);
  }

  saveDescriptions(){
    this.photoService.updatePhoto(this.photo!).subscribe((id:any) => {
      if (id!=null && id == this.photo.id)
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
    this.photo.albumId = value;
  }

}
