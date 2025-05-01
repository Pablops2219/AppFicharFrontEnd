import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor( private router: Router) {}
  title = 'app';

  ngOnInit(): void {
    
  }

  isLoginOrRegister(): boolean {
    const path = this.router.url;
    return path.includes('login') || path.includes('register');
  }
}
