import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from '../services/api.service';

interface Usuario {
  nombre: string;
  apellidos: string;
  email: string;
}

@Component({
  selector: 'app-importarusuarios',
  imports: [CommonModule],
  templateUrl: './importarusuarios.component.html',
  styleUrl: './importarusuarios.component.css',
})
export class ImportarusuariosComponent implements OnInit  {
  constructor(private apiService: ApiService) {}
  excelUsuarios: Usuario[] = [];
  usuariosSinContrasena: Usuario[] = [];


  ngOnInit(): void {
    this.cargarUsuariosSinContrasena();
  }

  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;

    if (target.files.length !== 1) return;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];
      this.excelUsuarios = [];

      for (let i = 1; i < data.length; i++) {
        const fila = data[i];
        if (fila.length >= 2) {
          this.excelUsuarios.push({
            nombre: fila[0],
            apellidos: fila[1],
            email: fila[2],
          });
        }
      }
    };

    reader.readAsBinaryString(target.files[0]);
  }

  importarUsuarios(): void {
    this.apiService.importarUsuarios(this.excelUsuarios).subscribe({
      next: () => {
        alert('Usuarios importados correctamente');
        this.excelUsuarios = [];
        this.cargarUsuariosSinContrasena();
      },
      error: (err) => alert('Error al importar usuarios'),
    });
  }

  cargarUsuariosSinContrasena(): void {
    this.apiService.getUsuariosSinContrasena().subscribe({
      next: (usuarios: Usuario[]) => this.usuariosSinContrasena = usuarios
    });
  }
}
