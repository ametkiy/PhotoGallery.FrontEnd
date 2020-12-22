import { Component, Input, OnInit } from '@angular/core';
import {Photo} from '../../models/photo'

import {ActivatedRoute} from '@angular/router'
import { Location } from '@angular/common';
import {PhotoService} from '../../services/photo.service'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  selectedImageSource!: SafeResourceUrl | undefined;
  photo: Photo |undefined;

  constructor(
    private activeteRoute:ActivatedRoute,
    private location:Location, 
    private photoService:PhotoService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const id = this.activeteRoute.snapshot.paramMap.get('id');
    this.photoService.getPhoto(Number(id))
    .subscribe(photo =>{
      this.photo = photo;
      
    });
  }

  goBack():void{
    this.location.back();
  }

  saveDescriptions(){
    this.photoService.updatePhoto(this.photo!).subscribe(() => alert('Update compleate'));
  }

  photo_url(data: Photo):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.photoData}`);;
  }

}
