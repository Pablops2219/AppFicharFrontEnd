import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

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
  
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Guardas token, datos, etc...
        this.router.navigate(['/home']); // <-- esto es lo importante
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  

}
