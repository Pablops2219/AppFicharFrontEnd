import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fichaje } from '../interfaces/fichaje';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  listMisFichajes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miusuario/misfichajes`);
  }
  
  // Obtener todos los fichajes
  listFichajes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fichajes`);
  }


  // Obtener todas las casas
  listCasas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/casas`);
  }

  // Obtener todos los trabajadores
  listTrabajadores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  // Obtener un trabajador por ID
  getTrabajador(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`);
  }

  // Obtener una casa por ID
  getCasa(casaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/casas/${casaId}`);
  }

  // Crear una nueva casa
  crearCasa(nombre: string): Observable<any> {
    const casa = `{
      "nombre": "${nombre}"
    }`;
    console.log(casa);
    return this.http.post(`${this.baseUrl}/casas`, casa, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  actualizarCasa(id: number, casa: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/casas/${id}`, casa);
  }

  crearFichaje(fichaje: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/fichajes`, fichaje); // Hacemos un POST con el objeto fichaje
  }

  fichar(fichaje: any) {
    return this.http.post<any>(`${this.baseUrl}/miusuario/fichar`, fichaje);
  }

  actualizarTrabajador(id: number, trabajador: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/usuarios/${id}`, trabajador);
  }

  // Eliminar un trabajador por ID
  eliminarTrabajador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/usuarios/${id}`);
  }

  // Eliminar una casa por ID
  eliminarCasa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/casas/${id}`);
  }
}
