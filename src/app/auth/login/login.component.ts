import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


function mustContainsQuestionMark(control : AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return { doesNotContainsQuestionMark: true}
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

    form = new FormGroup({
        email : new FormControl('',{
          validators:[Validators.email,Validators.required]
        }),
        password : new FormControl('',{
          validators: [Validators.required,Validators.minLength(6),mustContainsQuestionMark]
        })
    })

    onSubmit(){
        // console.log(this.form);
        const userEmail= this.form.value.email
        const userPassword = this.form.value.password
        console.log(userEmail,userPassword);
        
        
    }
}