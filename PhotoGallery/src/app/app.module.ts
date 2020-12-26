import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

import { PhotoService } from '../app/services/photo.service';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumsComponent } from './components/albums/albums.component'

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoDetailComponent,
    AddPhotoComponent,
    AlbumListComponent,
    AlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
