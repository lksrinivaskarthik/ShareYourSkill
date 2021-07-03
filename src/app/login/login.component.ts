import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  userLoginForm;

  validationmessages = {
  'email': {
    'required': ' Email is required',
    'pattern':'Invalid Email-id' ,
  },
  'password': {
    'required': ' password  is required',
    'minlength' : ' should contain minimum 7 characters',
    'maxlength' : 'should not exceed 15 characters',
  },
  };
  
    formerrors = {
      'email': '',
      'password': '',
    };

  constructor(private router:Router , private FormBuilder : FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {

    this.userLoginForm = this.FormBuilder.group({
      email : [ '', [ Validators.required,Validators.pattern('[a-z A-Z 0-9 \. \- \_]+[@][a-z]{2,6}[\.][a-z]{2,3}')] ],
      password : [ '',[ Validators.required,Validators.minLength(7), Validators.maxLength(15)]],
    });

    this.userLoginForm.valueChanges.subscribe((value:string)=>
    {
     this.checkValid(this.userLoginForm);
    })
 
  }
  navigateToSignup(){
    this.router.navigateByUrl("/signup");
  }

  submitLoginForm():void {
    if(this.userLoginForm.valid) {
      const instance= this.userLoginForm.value;
      this.auth.login(instance.email, instance.password);
    }
    else {
      console.log('invalid entries');
    }
  }

  checkValid( group = this.userLoginForm ): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractcontrol = group.get(key);
      this.formerrors[key] = '';
      if (
        abstractcontrol &&
        !abstractcontrol.valid &&
        (abstractcontrol.dirty || abstractcontrol.touched)
      ) {
        const messages = this.validationmessages[key];
        for (const errorkey in abstractcontrol.errors) {
          if (errorkey) {
            this.formerrors[key] += messages[errorkey] + ' ';
          }
        }
      }
    });
  }
}