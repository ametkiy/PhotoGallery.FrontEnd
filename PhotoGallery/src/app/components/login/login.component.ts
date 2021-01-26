import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterUserComponent } from '../register-user/register-user.component'
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string="";

  constructor(private authService:AuthService, 
    private accountService:AccountsService,
    private _location: Location,
    private dialog:MatDialog) { }
  
  ngOnInit(): void {
    
  }

  onSubmit(username:string, password:string){
    if (username && password){
      this.authService.login(username,password).subscribe((result: any) =>{
        if (result!=null){
          localStorage.setItem('token', result.access_token);
          this.getUserInfo();
        }
      });
    }
  }

  getUserInfo(){
    this.accountService.getUserInfo().subscribe((result:any) =>{
      if(result!=null){
        localStorage.setItem('userInfo', JSON.stringify(result));
      }
      this._location.back();
    })
  }

  onClickRegister(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "70%";

    let dialogRef = this.dialog.open(RegisterUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result!=null){
        this.userName = result.userName;
        //$('#username').val(result.userName);
      }
    });
  }

}
