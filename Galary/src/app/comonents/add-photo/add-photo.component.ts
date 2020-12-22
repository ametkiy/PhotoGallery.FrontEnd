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
    if (event.target.files && event.target.files[0]) {
        let file = <File>event.target.files[0];
        let fd = new FormData();
        fd.append("File",file,file.name);
        fd.append("tmp",file.name);

        this.photoService.addPhoto(fd).subscribe((response) => {
          console.log("add");
          this.fileIsUploadedonServerEvent.emit("File uploaded");
        });
    }
  }

}

