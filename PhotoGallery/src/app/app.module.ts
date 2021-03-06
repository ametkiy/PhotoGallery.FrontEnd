import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

import { PhotoService } from '../app/services/photo.service';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { EditAlbumComponent } from './components/edit-album/edit-album.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component'
import { TokenInterceptor } from './tokenInterceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component'

import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { AutocompleteOffDirective } from './autocomplete-off.directive';


@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoDetailComponent,
    AddPhotoComponent,
    AlbumListComponent,
    AlbumsComponent,
    EditAlbumComponent,
    ImagePreviewComponent,
    LoginComponent,
    RegisterUserComponent,
    AutocompleteOffDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatMenuModule,MatIconModule, MatBadgeModule
  ],
  providers: [
    PhotoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[PhotoDetailComponent, EditAlbumComponent, ImagePreviewComponent]
})
export class AppModule { }
