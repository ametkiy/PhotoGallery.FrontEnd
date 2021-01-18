import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhotoDetailComponent} from './components/photo-detail/photo-detail.component'
import { AppComponent } from './app.component';
import {PhotosComponent} from './components/photos/photos.component'
import { AlbumsComponent} from './components/albums/albums.component'
import { LoginComponent} from './components/login/login.component'

const routes: Routes = [
  {path:'', redirectTo:'photos',pathMatch:'full'},
  {path:'photos', component:PhotosComponent},
  { path: 'albums', component:AlbumsComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
