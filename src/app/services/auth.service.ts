import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private Auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login(email: string, password: string) {
    this.Auth.signInWithEmailAndPassword(email,password)
    .then((value)=>{
      this.toastr.success("Logged in Successfully");
      this.router.navigateByUrl("home");
    })
    .catch((err)=>{
      this.toastr.warning("Failed to Log-In");
      this.toastr.error("Your Email/Password is incorrect");
    })
  }

  signUp(email:string, password: string) {
    this.Auth.createUserWithEmailAndPassword(email,password)
    .then((value)=>{
      this.toastr.success("Registered SuccessFully");
      this.router.navigateByUrl("login");
    })
    .catch((err)=>{
      this.toastr.warning("Failed to Sing Up");
    })
  }

  logOut() {
    this.Auth.signOut().then(()=>{
      this.toastr.success("logged Out Successfully");
      this.router.navigateByUrl("login");
    })
    .catch((err)=>{
      this.toastr.warning("Failed to Log Out");
    })
  }

}