import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loginsincontra',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './loginsincontra.component.html',
  styleUrl: './loginsincontra.component.css'
})
export class LoginsincontraComponent {

  constructor( private router: Router,
    private authService: AuthService
  ){}

  errorMessage: string | null = null;
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });
  
  
  login() {
    console.log('LOGEANDO...');
    const rawForm = this.form.getRawValue();
    const credentials = {
      email: rawForm.email,
      password: rawForm.password
    };
  
    this.authService.confirmUser(credentials).subscribe({
      next: (response) => {
        // Guardas token, datos, etc...
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
