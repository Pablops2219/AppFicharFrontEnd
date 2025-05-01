import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultas',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})

export class ConsultasComponent implements OnInit {
  fichajes: any[] = [];
  casas: any[] = [];

  // Filtros
  filtroNombre: string = '';
  filtroId: string = '';
  filtroCasa: string = '';
  filtroDesde: string = '';
  filtroHasta: string = '';

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.listFichajes().subscribe((fichajes) => {
      this.fichajes = fichajes;
    });
    this.apiService.listCasas().subscribe((casas) => {
      this.casas = casas;
    });
  }

  get fichajesFiltrados() {
    return this.fichajes.filter((fichaje) => {
      const nombreCompleto = `${fichaje.usuario.firstName} ${fichaje.usuario.lastName}`.toLowerCase();
      const nombreCoincide = this.filtroNombre
        ? nombreCompleto.includes(this.filtroNombre.toLowerCase())
        : true;
  
      const casaCoincide = this.filtroCasa
        ? fichaje.casa?.nombre === this.filtroCasa
        : true;
  
      const hora = new Date(fichaje.hora);
      const desde = this.filtroDesde ? new Date(this.filtroDesde) : null;
      const hasta = this.filtroHasta ? new Date(this.filtroHasta) : null;
  
      const fechaDesdeCoincide = desde ? hora >= desde : true;
      const fechaHastaCoincide = hasta ? hora <= hasta : true;
  
      return (
        nombreCoincide &&
        casaCoincide &&
        fechaDesdeCoincide &&
        fechaHastaCoincide
      );
    });
  }
  
}
