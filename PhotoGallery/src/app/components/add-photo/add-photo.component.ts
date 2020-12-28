import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Photo} from '../../models/photo'
import {PhotoService} from '../../services/photo.service'
import { SafeResourceUrl } from '@angular/platform-browser';
import { CreatePhotoResult } from 'src/app/models/createPhotoResult';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  @Output() fileIsUploadedOnServerEvent = new EventEmitter<number>();
  @Input() selectedAlbumID:any = '00000000-0000-0000-0000-000000000000';
  
  errors:any =[];
  addedFilesCount:number=0

  constructor(private photoService:PhotoService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    
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

    data.append("AlbumId", this.selectedAlbumID);

    this.photoService.addPhoto(data).subscribe((result : any) => {
      if (result!=null){
        if(result.length>0){
          this.addedFilesCount = result.length;
          this.fileIsUploadedOnServerEvent.emit( this.addedFilesCount);
        }
      }
      else{
        this.errors = alert("Failed to add images.");
      }
    });
  }

}

