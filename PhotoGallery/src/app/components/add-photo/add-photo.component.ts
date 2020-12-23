import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Photo} from '../../models/photo'
import {PhotoService} from '../../services/photo.service'
import { SafeResourceUrl } from '@angular/platform-browser';
import { CreatePhotoResult } from 'src/app/models/createPhotoResult';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  @Output() fileIsUploadedOnServerEvent = new EventEmitter<number>();
  errors:any =[];
  addedFilesCount:number=0

  constructor(private photoService:PhotoService) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    this.addedFilesCount = 0;
    this.errors = [];
    var data = new FormData();
    if(event.target.files.length > 1) {
        for(var x = 0; x < event.target.files.length; x++) {
            data.append('Files', event.target.files.item(x));    
        }
    } else {
        data.append('Files', event.target.files[0]);   
    }

    this.photoService.addPhoto(data).subscribe((result : CreatePhotoResult) => {
      if (result!=null){
        if(result.errors.length>0){
          alert(result.errors);
          this.errors = result.errors;
        }
        this.addedFilesCount = result.guids.length;

        this.fileIsUploadedOnServerEvent.emit( this.addedFilesCount);
      }
      else{
        this.errors = "Failed to add images.";
      }
    });
  }

}

