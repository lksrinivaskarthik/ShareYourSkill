import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormsModule,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  
  addCourseForm:any;

  validationmessages = {
    'courseName': {
      'required': ' Name is required',
    },
    'cost': {
      'required': ' Cost  is required',
    },
    'duration':{
      'required':'duration is required',
    },
    'certificateLink':{
      'required':'Certificate Link is required',
    }
    };
    
      formerrors = {
        'courseName': '',
        'cost': '',
        'duration': '',
        'certificateLink': '',
      };

  constructor(public formbuilder:FormBuilder, public router:Router) { }

  ngOnInit(): void {
    this.addCourseForm = this.formbuilder.group({
      courseName : [ '' ,[Validators.required]],
      cost : [ '',[Validators.required]],
      duration : ['',[Validators.required]],
      demoVideoLink : [''],
      certificateLink : ['',[Validators.required]],
      experience : [''],
    });

    this.addCourseForm.valueChanges.subscribe((value:string)=>
    {
      this.checkValid(this.addCourseForm);
    })
  }

  

  submitAddCourseForm():void {
    if(this.addCourseForm.valid) {
      console.log(this.addCourseForm.value);
      this.router.navigateByUrl('/home');
    }
    else {
      console.log('invalid entries');
    }
  }

  checkValid( group = this.addCourseForm ): void {
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
