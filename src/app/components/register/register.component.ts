import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  fb = inject(FormBuilder);
  errorMessage: string | null = null;

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  register() {
  //   console.log('LoginComponent.register()');
  //   const rawForm = this.form.getRawValue();
  //   this.apiService
  //     .crearTrabajador(
  //       rawForm.firstName,
  //       rawForm.secondName,
  //       rawForm.password,
  //       rawForm.email
  //     )
  //     .subscribe({
  //       next: () => {
  //         this.router.navigateByUrl('/login');
  //       },
  //       error: (err: { code: string | null }) => {
  //         this.errorMessage = err.code;
  //       },
  //     }); // Usamos el método login del servicio
  }
}
