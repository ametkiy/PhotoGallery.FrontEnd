import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Album } from 'src/app/models/album';
import { FormControl, FormGroup } from '@angular/forms'
import { AlbumService } from 'src/app/services/album.service';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {
  album:Album = new Album();

  constructor(private dialogBox:MatDialogRef<EditAlbumComponent>,
    private albumService:AlbumService,
    private tagService:TagService,
    @Inject(MAT_DIALOG_DATA) public data: {editAlbum: Album}) { }

  ngOnInit(): void {
    this.album = this.data.editAlbum;
  }

  onClickClose(){
    this.dialogBox.close();
  }

  onTagSubmit(input:any){
    if(input.value=='')return;
    
    var result = this.album.tags.filter(obj => {
      return obj.name === input.value;
    })
    if (result.length>0) return;

    let tag = new Tag();
    tag.name = input.value;
    this.tagService.addTag(tag).subscribe((result : any) => {
      tag.id = result;
      this.album.tags.push(tag);

      input.value = "";
    });
  }

  deleteTagFromAlbum(index:number){
    this.album.tags.splice(index,1);
  }

  onSubmit(title:string, description:string, tags:string){
    this.album!.title = title;
    if (this.album!.title=="" || this.album!.title==null) return;
    this.album!.description = description;
   
    if(this.album!.id == null || this.album!.id == ""){
      this.albumService.addAlbum(this.album!).subscribe((result : any) => {
        if (result!=null){
          this.dialogBox.close(result);
        }
        else{
          alert("Cann't add new album");
        }
      });
    }else{
      this.albumService.editAlbum(this.album!).subscribe((result : any) => {
        if (result!=null){
          this.dialogBox.close(result);
        }
        else{
          alert("Cann't edit new album");
        }
      });
    }


    }
}
