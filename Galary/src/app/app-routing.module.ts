import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhotoDetailComponent} from '../app/comonents/photo-detail/photo-detail.component'
import { AppComponent } from './app.component';
import {PhotosComponent} from '../app/comonents/photos/photos.component'

const routes: Routes = [
  {path:'', redirectTo:'photos',pathMatch:'full'},
  {path:'photos', component:PhotosComponent},
  {path: 'detail/:id', component:PhotoDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
