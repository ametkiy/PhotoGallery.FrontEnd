import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Photo Gallery';
  constructor(private http: HttpClient, public router: Router, private authService:AuthService){
  }

  onClickLogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
