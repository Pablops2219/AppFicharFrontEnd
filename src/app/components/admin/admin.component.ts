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
  rolesDisponibles = ['USER', 'MANAGER', 'ADMIN', 'DEVELOPER'];

  rolesSeleccionados: string[] = [];
  rolesSeleccionadosActualizar: string[] = [];

  managers: any[] = [];
  managerSeleccionado: any = null;



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
      roles: [[], Validators.required],
    });

    this.trabajadorFormActualizar = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: [[], Validators.required],
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
    this.apiService
      .getManagers()
      .subscribe((data) => ((this.managers = data), console.log(data)));
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

      this.apiService
        .actualizarCasa(this.editandoCasaId, { nombre: rawForm.nombre })
        .subscribe((response) => {
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
    });
  }

  // TRABAJADORES
  crearTrabajador() {
    const rawForm = this.trabajadorForm.getRawValue();

    const userData = {
      email: rawForm.email,
      password: rawForm.password,
      firstName: rawForm.firstName,
      lastName: rawForm.lastName,
      rolesRequest: { roleListName: this.rolesSeleccionados },
    };

    this.apiService.crearTrabajador(userData).subscribe((response) => {
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
        firstName: rawForm.firstName,
        lastName: rawForm.lastName,
        password: rawForm.password,
        roles: this.rolesSeleccionadosActualizar,
      };
      console.log(
        'Roles seleccionados para actualizar:',
        this.rolesSeleccionadosActualizar
      );
      console.log('Datos del trabajador a actualizar:', userData);
      this.apiService
        .actualizarTrabajador(this.editandoTrabajadorId, userData)
        .subscribe((response) => {
          console.log('Trabajador actualizado:', response);
          this.cargarDatos();
          this.trabajadorFormActualizar.reset();
          this.rolesSeleccionadosActualizar = [];
          this.rolesSeleccionados = [];
          this.editandoTrabajadorId = null;

          // Cerrar el modal
          const modalElement = document.getElementById('editarModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        });
    }
  }

  editarFormActualizarTrabajador(t: any) {
    this.editandoTrabajadorId = t.id;
    console.log('Trabajador a editar:', t);

    this.trabajadorFormActualizar.patchValue({
      email: t.email,
      password: '', // se puede dejar vacío si no se edita
      firstName: t.firstName,
      lastName: t.lastName,
    });

    // Aquí seleccionas los roles actuales del trabajador
    this.rolesSeleccionadosActualizar = t.roles.map((r: any) => r.roleEnum);

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

  toggleRol(rol: string) {
    const index = this.rolesSeleccionados.indexOf(rol);
    if (index >= 0) {
      this.rolesSeleccionados.splice(index, 1);
    } else {
      this.rolesSeleccionados.push(rol);
    }

    this.trabajadorForm.get('roles')?.setValue(this.rolesSeleccionados);
  }

  toggleRolActualizar(rol: string) {
    const index = this.rolesSeleccionadosActualizar.indexOf(rol);
    if (index >= 0) {
      this.rolesSeleccionadosActualizar.splice(index, 1);
    } else {
      this.rolesSeleccionadosActualizar.push(rol);
    }

    this.trabajadorFormActualizar
      .get('roles')
      ?.setValue(this.rolesSeleccionadosActualizar);
  }

  eliminarRolActualizar(index: number) {
    this.rolesSeleccionadosActualizar.splice(index, 1);
    this.trabajadorFormActualizar
      .get('roles')
      ?.setValue(this.rolesSeleccionadosActualizar);
  }

  eliminarRol(index: number) {
    this.rolesSeleccionados.splice(index, 1);
    this.trabajadorForm.get('roles')?.setValue(this.rolesSeleccionados);
  }

  abrirModal(manager: any) {
    this.managerSeleccionado = {
      ...manager,
      nuevasCasas: [...(manager.casasVigiladas?.map((c: any) => c.id) || [])]
    };

    const modalElement = document.getElementById('modalEditarManager');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  }

  casaSeleccionada(manager: any, casaId: number): boolean {
    return manager?.nuevasCasas.includes(casaId);
  }

  onCasaChange(manager: any, casaId: number, event: any) {
    if (event.target.checked) {
      manager.nuevasCasas.push(casaId);
    } else {
      manager.nuevasCasas = manager.nuevasCasas.filter((id: number) => id !== casaId);
    }
  }

  guardarCambios(manager: any) {
    const body = {
      managerId: manager.id,
      casaIds: manager.nuevasCasas,
    };
    console.log('Cuerpos de la solicitud:', body);

    this.apiService.updateManager(body).subscribe(() => {
      manager.editing = false;
      this.cargarDatos();
    });
    
  }
}
