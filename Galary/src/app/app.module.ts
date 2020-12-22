import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './comonents/photos/photos.component';
import { PhotoDetailComponent } from './comonents/photo-detail/photo-detail.component';

import { PhotoService } from '../app/services/photo.service';
import { AddPhotoComponent } from './comonents/add-photo/add-photo.component'

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoDetailComponent,
    AddPhotoComponent
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
