import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  showToast(message: string, title: string, success: boolean = true) {
    const toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) return;

    // Crear el toast dinámicamente
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
      <div class="toast-header">
        <strong class="me-auto">${title}</strong>
        ${success ? '🟢' : '🔴'} 
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;

    toastContainer.appendChild(toast);

    // Inicializar el Toast de Bootstrap
    const toastBootstrap = new bootstrap.Toast(toast, { delay: 3000 });
    toastBootstrap.show();

    // Eliminar el toast después de que se cierre
    toast.addEventListener('hidden.bs.toast', () => {
      toast.remove();
    });
  }
}
