import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent],
})
export class AppComponent {}
