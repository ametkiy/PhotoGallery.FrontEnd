import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  constructor(private dialogBox:MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {url: any}) { }

  ngOnInit(): void {
  }

  closePreviewForm(){
    this.dialogBox.close();
  }

}
