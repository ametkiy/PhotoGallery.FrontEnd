import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums:Album[] = [];
  startedAddAlbum : boolean = false;
  @Input() selectedAlbum!:any;
  @Output() newSelectedAlbumEvent = new EventEmitter<any>();

  constructor(private albumService:AlbumService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums().subscribe((albums: Album[] | any) =>{
      this.albums = albums;
      var tmp= this.selectedAlbum;
    });
  }

  onChangeAlbum(value:any){
    this.newSelectedAlbumEvent.emit(this.selectedAlbum);
  }

  startAddAlbum(){
    this.startedAddAlbum = true;
  }

  addAlbum(value:string){
    if (value!=null && value!=""){
      let album = new Album();
      album.title = value;
      this.albumService.addAlbum(album).subscribe((result : any) => {
        if (result!=null){
          this.selectedAlbum = result;
          this.getAlbums();
          this.startedAddAlbum = false;
        }
        else{
          alert("Cann't add new album");
        }
      });
    }else{
      this.startedAddAlbum = false;
    }
  }

  deleteAlbum(){
    if(confirm("Are you sure to delete current album")) {
      this.albumService.deleteAlbum(this.selectedAlbum).subscribe((response) => {
        if(response == this.selectedAlbum ){
          this.selectedAlbum=null; 
          this.getAlbums();
        }else{
          alert("Cann't delete album");
        }
      });
    }
  }

}
