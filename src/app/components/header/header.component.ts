import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userPowerLevel: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userPowerLevel = this.authService.getUserPowerLevel();
  }

  onLogout() {}
}
