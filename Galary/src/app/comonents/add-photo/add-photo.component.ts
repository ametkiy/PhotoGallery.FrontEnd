import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Photo} from '../../models/photo'
import {PhotoService} from '../../services/photo.service'
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  @Output() fileIsUploadedonServerEvent = new EventEmitter<string>();
  b64Blob: any;

  constructor(private photoService:PhotoService) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    var data = new FormData();
    if(event.target.files.length > 1) {
        for(var x = 0; x < event.target.files.length; x++) {
            data.append('Files', event.target.files.item(x));    
        }
    } else {
        data.append('Files', event.target.files[0]);   
    }

    this.photoService.addPhoto(data).subscribe((response) => {
      console.log("add");
      this.fileIsUploadedonServerEvent.emit("File uploaded");
    });
  }

  onFileSelected11(event:any){
    if (event.target.files && event.target.files[0]) {
        let file = <File>event.target.files[0];
        let fd = new FormData();
        fd.append("File",file,file.name);

        this.photoService.addPhoto(fd).subscribe((response) => {
          console.log("add");
          this.fileIsUploadedonServerEvent.emit("File uploaded");
        });
    }
  }

}

