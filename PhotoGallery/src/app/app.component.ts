import { Component, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Photo Gallery';
  userInfo = this.getUserName();

  constructor(private http: HttpClient, public router: Router, private authService:AuthService){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd)
          this.userInfo = this.getUserName();
      
    });

    
  }

  getUserName():string{
    let userInfoJson = localStorage.getItem("userInfo");
    if (userInfoJson == null) return "";
    let userInfo = JSON.parse(userInfoJson);
    if (userInfo!=null)
      return userInfo.firstName + " " + userInfo.lastName;
    else
      return ""
  }

  onClickLogOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }

  refreshUserInfo(event:any){
    this.userInfo = this.getUserName();
  }
}
