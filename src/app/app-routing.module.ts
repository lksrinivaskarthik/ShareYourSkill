import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCourseComponent } from './add-course/add-course.component';


const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"profile", children:[{path:"",component:ProfileComponent},{path:"add-course",component:AddCourseComponent}]},
{path:"signup",component:SignupComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
