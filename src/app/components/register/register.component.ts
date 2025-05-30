import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  fb = inject(FormBuilder);
  errorMessage: string | null = null;

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  register() {
    const rawForm = this.form.getRawValue();
    const userData = {
      email: rawForm.email,
      password: rawForm.password,
      firstName: rawForm.firstName,
      lastName: rawForm.secondName,
      rolesRequest: { roleListName: ['USER'] },
    };


    this.authService
      .register(userData)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (err: { code: string | null }) => {
          this.errorMessage = err.code;
        },
      }); 
  }

}
