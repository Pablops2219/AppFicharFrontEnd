import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';

declare var bootstrap: any; // para usar los modales de Bootstrap JS

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  casas: any[] = [];
  trabajadores: any[] = [];
  casaForm: FormGroup;
  casaFormActualizar: FormGroup;
  editandoCasaId: number | null = null;
  trabajadorForm: FormGroup;
  trabajadorFormActualizar: FormGroup;
  editandoTrabajadorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.casaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.casaFormActualizar = this.fb.group({
      nombre: ['', Validators.required],
    });

    this.trabajadorForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.trabajadorFormActualizar = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.apiService.listCasas().subscribe((data) => (this.casas = data));
    this.apiService
      .listTrabajadores()
      .subscribe((data) => (this.trabajadores = data));
  }

  // CASAS
  crearCasa() {
    const rawForm = this.casaForm.getRawValue();
    this.apiService.crearCasa(rawForm.nombre).subscribe((response) => {
      console.log('Casa creada:', response);
      this.cargarDatos();
      this.casaForm.reset();
    });
  }

  editarCasa(casa: any) {
    this.editandoCasaId = casa.id;
    this.casaFormActualizar.patchValue({ nombre: casa.nombre });
  
    const modalElement = document.getElementById('editarCasaModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  
  actualizarCasa() {
    if (this.editandoCasaId !== null) {
      const rawForm = this.casaFormActualizar.getRawValue();
  
      this.apiService.actualizarCasa(this.editandoCasaId, { nombre: rawForm.nombre }).subscribe((response) => {
        console.log('Casa actualizada:', response);
        this.cargarDatos();
        this.casaFormActualizar.reset();
        this.editandoCasaId = null;
  
        const modalElement = document.getElementById('editarCasaModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      });
    }
  }
  

  eliminarCasa(id: number) {
    this.apiService.eliminarCasa(id).subscribe((response) => {
      console.log('Casa eliminada:', response);
      this.cargarDatos();
    });}

  // TRABAJADORES
  crearTrabajador() {
    const rawForm = this.trabajadorForm.getRawValue();

    const userData = {
      email: rawForm.email,
      password: rawForm.password,
      firstName: rawForm.firstName,
      lastName: rawForm.lastName,
      rolesRequest: { roleListName: ['USER'] },
    };

    this.authService
      .register(userData)
      .subscribe((response) => {
        console.log('Trabajador creado:', response);
        this.cargarDatos();
        this.trabajadorForm.reset();
      });
  }

  actualizarTrabajador() {
    if (this.editandoTrabajadorId !== null) {
      const rawForm = this.trabajadorFormActualizar.getRawValue();
      const userData = {
        email: rawForm.email,
        password: rawForm.password,
        firstName: rawForm.firstName,
        lastName: rawForm.lastName,
      };
  
      this.apiService.actualizarTrabajador(this.editandoTrabajadorId, userData).subscribe((response) => {
        console.log('Trabajador actualizado:', response);
        this.cargarDatos();
        this.trabajadorFormActualizar.reset();
        this.editandoTrabajadorId = null;
  
        // Cerrar el modal
        const modalElement = document.getElementById('editarModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      });
    }
  }

  editarTrabajador(t: any) {
    this.editandoTrabajadorId = t.id;
    this.trabajadorFormActualizar.patchValue({
      email: t.email,
      password: '', // se puede dejar vacío si no se edita
      firstName: t.firstName,
      lastName: t.lastName,
    });
  
    const modalElement = document.getElementById('editarModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  

  eliminarTrabajador(id: number) {
    this.apiService.eliminarTrabajador(id).subscribe((response) => {
      console.log('Trabajador eliminado:', response);
      this.cargarDatos();
    });
  }
}
