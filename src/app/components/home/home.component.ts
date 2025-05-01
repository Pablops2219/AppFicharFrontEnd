import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Fichaje } from '../../interfaces/fichaje';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  fichajes: any[] = [];
  casas: any[] = [];
  form: FormGroup;
  horaActual: string = '';

  paginaActual: number = 1;
  fichajesPorPagina: number = 50;

  constructor(
    public apiService: ApiService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      casa: ['', Validators.required],
      tipo: ['', Validators.required],
    });

    this.actualizarHora();
    setInterval(() => this.actualizarHora(), 1000);
  }

  actualizarHora() {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  fichar() {
    const casaId = this.form.get('casa')?.value;
    const tipo = this.form.get('tipo')?.value.toString().toUpperCase();
  
    const fichaje = {
      casaid: casaId,
      tipo: tipo
    };
  
    console.log('Fichaje creado:', fichaje);
  
    this.apiService.fichar(fichaje).subscribe(
      (response) => {
        console.log('Fichaje creado con éxito:', response);
        this.cargarFichajes(); // Actualizar lista
      },
      (error) => {
        console.error('Error al crear el fichaje:', error);
      }
    );
  }
  

  ngOnInit(): void {
    this.cargarFichajes();
    this.apiService.listCasas().subscribe((casas) => {
      this.casas = casas;
      console.log('Casas recibidas:', this.casas.length);
    });
  }

  // 📥 Recarga los fichajes
  cargarFichajes() {
    this.apiService.listMisFichajes().subscribe((fichajes) => {
      this.fichajes = fichajes;
      console.log('Fichajes recibidos:', this.fichajes.length);
    });
  }

  // 📄 Getter para paginación
  get fichajesPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.fichajesPorPagina;
    const fin = inicio + this.fichajesPorPagina;
    return this.fichajes.slice(inicio, fin);
  }

  // 🔢 Total de páginas
  get totalPaginas(): number {
    return Math.ceil(this.fichajes.length / this.fichajesPorPagina);
  }

}
