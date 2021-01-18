import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private _location: Location) { }

  ngOnInit(): void {
  }

  onSubmit(username:string, password:string){
    if (username && password){
      this.authService.login(username,password).subscribe((result: any) =>{
        //console.log(result);
        localStorage.setItem('token', result.access_token);
        this._location.back();
      });
    }
  }
}
