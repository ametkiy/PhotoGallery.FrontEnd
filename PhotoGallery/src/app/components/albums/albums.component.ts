import { Component, OnInit } from '@angular/core';
import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { EditAlbumComponent } from '../edit-album/edit-album.component'

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums:Album[] = [];
  selectedAlbumId:any = '00000000-0000-0000-0000-000000000000';

  constructor(private albumService:AlbumService,
    private dialog:MatDialog) { }

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
          this.selectedAlbumId = '00000000-0000-0000-0000-000000000000';
          this.getAlbums();
        }else{
          alert("Cann't delete album");
        }
      });
    }
  }

  addAlbum(){
    this.showEditForm(new Album());
  }

  editAlbumById(album:Album){
    this.showEditForm(album);
  }

  showEditForm(album:Album){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {editAlbum:album};

    let dialogRef = this.dialog.open(EditAlbumComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result==true){
        this.getAlbums();
      }
    });
  }

}
