import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-consultas',
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css',
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

  constructor(public apiService: ApiService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.apiService.listFichajesManager().subscribe((fichajes) => {
      this.fichajes = fichajes;
    });
    this.apiService.listCasasManager().subscribe((casas) => {
      this.casas = casas;
    });
  }

  get fichajesFiltrados() {
    return this.fichajes.filter((fichaje) => {
      const nombreCompleto =
        `${fichaje.usuario.firstName} ${fichaje.usuario.lastName}`.toLowerCase();
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

  exportarFichajesFiltrados() {
    const fichajesAExportar: any = {};

    for (const fichaje of this.fichajesFiltrados) {
      fichajesAExportar[fichaje.id] = {
        hora: fichaje.hora,
        casa: fichaje.casa?.nombre,
        usuario: `${fichaje.usuario.firstName} ${fichaje.usuario.lastName}`,
        tipo: fichaje.tipo,
      };
    }

    console.log(
      'Fichajes a exportar (objeto):',
      JSON.stringify(fichajesAExportar, null, 2)
    );

    const rows = Object.entries(fichajesAExportar).map(
      ([id, row]: [string, any]) => ({
        ID: id,
        Hora: this.datePipe.transform(row.hora, 'dd/MM/yyyy HH:mm:ss'),
        Casa: row.casa,
        Usuario: row.usuario,
        Tipo: row.tipo,
      })
    );

    console.log('Fichajes a exportar (array):', JSON.stringify(rows, null, 2));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fichajes');

    // Exporta como archivo
    XLSX.writeFile(workbook, 'fichajes_filtrados.xlsx');
  }
}
