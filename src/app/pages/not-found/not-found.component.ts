import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="not-found">
        <div class="error-code">404</div>
        <h1>Página No Encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <div class="actions">
          <a routerLink="/" class="btn btn-primary">Volver al Inicio</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: var(--spacing-xxl) var(--spacing-lg);
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .error-code {
      font-family: var(--font-heading);
      font-size: 8rem;
      font-weight: 700;
      color: var(--border);
      line-height: 1;
      margin-bottom: var(--spacing-lg);
    }
    
    h1 {
      font-size: 2rem;
      margin-bottom: var(--spacing-md);
    }
    
    p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
      max-width: 500px;
    }
    
    .actions {
      display: flex;
      gap: var(--spacing-md);
    }
    
    @media (max-width: 768px) {
      .error-code {
        font-size: 5rem;
      }
      
      h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class NotFoundComponent {}
