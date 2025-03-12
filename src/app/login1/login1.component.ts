import { formatCurrency, JsonPipe } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import { EmailValidator, FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css',
})
export class LoginComponent {
  private form = viewChild<NgForm>('form')
  private destroyRef = inject(DestroyRef)

  constructor(){
    afterNextRender(()=>{
      const savedform = window.localStorage.getItem('save-login-form')
      if(savedform){
        const loadedform = JSON.parse(savedform)
        const savedEmail =  loadedform.email
        setTimeout(()=>{
          this.form()?.controls['email'].setValue(savedEmail)
        },1)
        // this.form()?.setValue({email: savedEmail , password : ''})
      }
      const subscriotion = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next:(value)=>{
          window.localStorage.setItem('save-login-form',JSON.stringify({email: value.email}))
          console.log(value);
        }
      })
      this.destroyRef.onDestroy(()=> subscriotion?.unsubscribe())
    })
  }
  onSubmit(formData:NgForm){
    if(formData.form.invalid){
      return 
    }
    const userEmail = formData.form.value.email
    const password = formData.form.value.password
    console.log(formData.form.value.email);
    formData.form.reset()
  }
}
