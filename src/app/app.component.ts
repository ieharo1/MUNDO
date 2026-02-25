import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h3>MUNDO</h3>
            <p>Tu fuente de noticias confiables del mundo entero.</p>
          </div>
          <div class="footer-links">
            <h4>Categorías</h4>
            <ul>
              <li><a href="/category/mundo">Mundo</a></li>
              <li><a href="/category/economia">Economía</a></li>
              <li><a href="/category/tecnologia">Tecnología</a></li>
              <li><a href="/category/deportes">Deportes</a></li>
            </ul>
          </div>
          <div class="footer-info">
            <p><strong>Isaac Esteban Haro Torres</strong></p>
            <p>Ingeniero en Sistemas · Full Stack · Automatización · Data</p>
            <p>📧 zackharo1&#64;gmail.com · 📱 098805517</p>
          </div>
          <div class="footer-copyright">
            <p>&copy; 2026 Isaac Esteban Haro Torres - Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 200px);
      padding-top: 80px;
    }
    
    .footer {
      background-color: var(--primary);
      color: var(--white);
      padding: var(--spacing-xl) 0;
      margin-top: var(--spacing-xxl);
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--spacing-xl);
    }
    
    .footer-brand h3 {
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 700;
      color: var(--white);
      margin-bottom: var(--spacing-sm);
    }
    
    .footer-brand p {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .footer-links h4 {
      font-family: var(--font-body);
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--white);
      margin-bottom: var(--spacing-md);
    }
    
    .footer-links ul {
      list-style: none;
    }
    
    .footer-links li {
      margin-bottom: var(--spacing-sm);
    }
    
    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      transition: color var(--transition);
    }
    
    .footer-links a:hover {
      color: var(--white);
    }
    
    .footer-info {
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--spacing-md) 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: var(--spacing-md);
    }
    
    .footer-info p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
      margin-bottom: var(--spacing-xs);
    }
    
    .footer-info strong {
      color: var(--white);
    }
    
    .footer-copyright {
      grid-column: 1 / -1;
      padding-top: var(--spacing-lg);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  `]
})
export class AppComponent {}
