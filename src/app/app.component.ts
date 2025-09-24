import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-1 mb-3 shadow-sm sticky-top">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/">Gestione Ordini</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-2 gap-lg-3">
            <li class="nav-item">
              <a class="nav-link" routerLink="/prodotti" routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: false }">
                 Prodotti
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/ordini" routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: false }">
                 Ordini
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/statistiche" routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: true }">
                 Statistiche
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar-brand {
      font-weight: bold;
      font-size: 1.25rem;
    }

    .nav-link {
      font-size: 0.95rem;
      margin: 0 6px;
    }

    .nav-link.active {
      font-weight: bold;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    }

    .container {
      padding-bottom: 50px;
    }
  `]
})
export class AppComponent {
  title = 'gestione-ordini';
}
