import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
   isMatched:boolean = true;
  userRegisterForm;
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
    'userName': {
      'required': ' userName is required',
    },
    
    'confirmPassword': {
      'required': ' password is required',
    },
    };
    
      formerrors = {
        'email': '',
        'userName':'',
        'password': '',
        'confirmPassword':''
      };
   
  constructor(private router:Router,private FormBuilder : FormBuilder, private auth: AuthService) {
    
   }

   ngOnInit(): void {

    this.userRegisterForm = this.FormBuilder.group({
      userName:['',[Validators.required]],
      email : [ '', [ Validators.required,Validators.pattern('[a-z A-Z 0-9 \. \- \_]+[@][a-z]{2,6}[\.][a-z]{2,3}')] ],
      password : [ '',[ Validators.required,Validators.minLength(7), Validators.maxLength(15)]],
      confirmPassword:['',[Validators.required]]
    });

    this.userRegisterForm.valueChanges.subscribe((value:string)=>
    {
     this.checkValid(this.userRegisterForm);
    })
 
  }
  navigateToLogin(){
      this.router.navigateByUrl('/login');
  }
  
  submitFormDetails():void {
    let formInstance=this.userRegisterForm.value;

    if(formInstance["password"]!=formInstance["confirmPassword"]){
      // this.userRegisterForm.markAsInvalid();
       this.isMatched = false;
    }
    
    else if(this.userRegisterForm.valid) {
      this.auth.signUp(formInstance.email, formInstance.password);
      this.isMatched = true;
    }
    else  {
      console.log('invalid entries');
    }
  }

  checkValid( group = this.userRegisterForm ): void {
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