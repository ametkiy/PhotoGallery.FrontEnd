import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditAlbumComponent } from '../edit-album/edit-album.component'

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums:Album[] = [];
  @Input() selectedAlbum!:any;
  @Input() userIsOwner:boolean=false;
  @Output() newSelectedAlbumEvent = new EventEmitter<any>();

  constructor(private albumService:AlbumService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    let tmp = this.selectedAlbum;
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums().subscribe((albums: Album[] | any) =>{
      this.albums = albums;
    });
  }

  onChangeAlbum(event:any){
    if (event!=null){
      let value = event.target.value;
      this.newSelectedAlbumEvent.emit(this.selectedAlbum);
    }
  }

  startAddAlbum(){
    this.showEditForm(new Album());
  }

  editAlbum(){
    let item = this.albums.filter(item => item.id === this.selectedAlbum)[0];
    this.showEditForm(item);
  }

  showEditForm(album:Album){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {editAlbum:album};

    let dialogRef = this.dialog.open(EditAlbumComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result!=null){
        this.selectedAlbum = result;
        this.newSelectedAlbumEvent.emit(this.selectedAlbum);
        this.getAlbums();
      }
    });
  }

  deleteAlbum(){
    if(confirm("Are you sure to delete current album")) {
      this.albumService.deleteAlbum(this.selectedAlbum).subscribe((response) => {
        this.selectedAlbum=null; 
        this.newSelectedAlbumEvent.emit(this.selectedAlbum);
        this.getAlbums();
      });
    }
  }

}
