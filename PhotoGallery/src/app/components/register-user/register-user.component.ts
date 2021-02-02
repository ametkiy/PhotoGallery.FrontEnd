import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterUser } from 'src/app/models/registerUser';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm : FormGroup = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl("",Validators.required),
    lastName: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.minLength(8)]),
    passwordConfirmation: new FormControl("",Validators.required)
  });
  constructor(private dialogBox:MatDialogRef<RegisterUserComponent>,
    private formBuilder: FormBuilder,
    private accountService:AccountsService) { }

  ngOnInit(): void {
  }

  onClickClose(){
    this.dialogBox.close();
  }

  onSubmit(){
    if(this.registerForm.controls.userName.value===''|| this.registerForm.controls.password.value==='' 
        || this.registerForm.controls.firstName.value === '' || this.registerForm.controls.last_name.value === '' 
        || this.registerForm.controls.email.value === ''){alert ("All fields must be completed."); return}
    if (this.registerForm.controls.password.value !== this.registerForm.controls.passwordConfirmation.value){ alert("Password does not match password confirmation"); return;}

    let user = new RegisterUser();
    user = {
      userName: this.registerForm.controls.username.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      firstName: this.registerForm.controls.first_name.value,
      lastName: this.registerForm.controls.last_name.value,
    }

    this.accountService.registrUser(user).subscribe((result: any) =>{
      if (result!=null){
        this.dialogBox.close(user);
      }
    });
  }
}
