import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fichaje } from '../interfaces/fichaje';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listMisFichajes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miusuario/misfichajes`);
  }

  listFichajesManager(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miusuario/manager-fichajes`);
  }

  listCasasManager(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miusuario/manager-casas`);
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

  eliminarTrabajador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/usuarios/${id}`);
  }

  eliminarCasa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/casas/${id}`);
  }

  crearTrabajador(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    rolesRequest: { roleListName: string[] };
    roleListName?: string[];
  }) {
    return this.http.post(`${this.baseUrl}/usuarios`, userData);
  }

  getManagers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/managers`);
  }

  updateManager(body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuarios/managers`, body);
  }

  importarUsuarios(usuarios: any[]) {
    return this.http.post(`${this.baseUrl}/usuarios/importar`, usuarios);
  }

  getUsuariosSinContrasena(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/sin-contrasena`);
  }
}
