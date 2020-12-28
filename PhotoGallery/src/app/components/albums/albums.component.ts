import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums:Album[] = [];
  selectedAlbumId:any = '00000000-0000-0000-0000-000000000000';

  constructor(private albumService:AlbumService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums().subscribe((albums: Album[] | any) =>{
      this.albums = albums;
    });
  }

  listAlbumsClick($event:Event, albumId:any){
    this.selectedAlbumId = albumId;
  }

  deleteAlbumById(id:any){
    if(confirm("Are you sure to delete current album")) {
      this.albumService.deleteAlbum(id).subscribe((response) => {
        if(response == id ){
          this.getAlbums();
        }else{
          alert("Cann't delete album");
        }
      });
    }
  }

}
