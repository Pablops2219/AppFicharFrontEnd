export interface Fichaje {
    trabajadorId: number;
    casaId: number;
    hora: string;
    tipo: 'entrada' | 'salida';
    nombre_trabajador?: string; // Nombre del trabajador
    nombre_casa?: string; // Nombre de la casa
  }
  