import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">MUNDO</a>
        
        <button class="menu-toggle" (click)="toggleMenu()" [class.active]="menuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-content" [class.open]="menuOpen">
          <ul class="nav-links">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a></li>
            <li><a routerLink="/category/mundo" routerLinkActive="active">Mundo</a></li>
            <li><a routerLink="/category/economia" routerLinkActive="active">Economía</a></li>
            <li><a routerLink="/category/tecnologia" routerLinkActive="active">Tecnología</a></li>
            <li><a routerLink="/category/deportes" routerLinkActive="active">Deportes</a></li>
          </ul>
          
          <div class="search-container">
            <form (submit)="onSearch($event)" class="search-form">
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                name="search"
                placeholder="Buscar noticias..."
                (input)="onSearchInput()"
              >
              <button type="submit" class="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>
            </form>
            @if (searchResults.length > 0) {
              <div class="search-results">
                @for (news of searchResults; track news.id) {
                  <a [routerLink]="['/news', news.id]" (click)="closeSearch()">
                    {{ news.title }}
                  </a>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--white);
      box-shadow: var(--shadow);
      z-index: 1000;
      height: 80px;
      display: flex;
      align-items: center;
    }
    
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
    }
    
    .logo {
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 2px;
    }
    
    .nav-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-xl);
    }
    
    .nav-links {
      display: flex;
      list-style: none;
      gap: var(--spacing-lg);
    }
    
    .nav-links a {
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-primary);
      padding: var(--spacing-sm) 0;
      position: relative;
    }
    
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent);
      transition: width var(--transition);
    }
    
    .nav-links a:hover::after,
    .nav-links a.active::after {
      width: 100%;
    }
    
    .nav-links a.active {
      color: var(--accent);
    }
    
    .search-container {
      position: relative;
    }
    
    .search-form {
      display: flex;
      align-items: center;
      border: 1px solid var(--border);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .search-form input {
      border: none;
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: 0.875rem;
      width: 200px;
      outline: none;
      font-family: var(--font-body);
    }
    
    .search-btn {
      background: var(--primary);
      border: none;
      padding: var(--spacing-sm) var(--spacing-md);
      cursor: pointer;
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .search-btn:hover {
      background: var(--secondary);
    }
    
    .search-results {
      position: absolute;
      top: 100%;
      right: 0;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 4px;
      box-shadow: var(--shadow-hover);
      width: 300px;
      max-height: 300px;
      overflow-y: auto;
      margin-top: var(--spacing-xs);
    }
    
    .search-results a {
      display: block;
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: 0.875rem;
      border-bottom: 1px solid var(--border);
      transition: background var(--transition);
    }
    
    .search-results a:hover {
      background: var(--background);
    }
    
    .search-results a:last-child {
      border-bottom: none;
    }
    
    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--spacing-sm);
    }
    
    .menu-toggle span {
      display: block;
      width: 25px;
      height: 2px;
      background: var(--text-primary);
      transition: all var(--transition);
    }
    
    .menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
    
    @media (max-width: 768px) {
      .menu-toggle {
        display: flex;
      }
      
      .nav-content {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: var(--white);
        flex-direction: column;
        padding: var(--spacing-lg);
        gap: var(--spacing-lg);
        box-shadow: var(--shadow);
        transform: translateY(-150%);
        opacity: 0;
        transition: all var(--transition);
      }
      
      .nav-content.open {
        transform: translateY(0);
        opacity: 1;
      }
      
      .nav-links {
        flex-direction: column;
        align-items: center;
      }
      
      .search-form input {
        width: 150px;
      }
      
      .search-results {
        width: 100%;
        left: 0;
        right: 0;
      }
    }
  `]
})
export class NavbarComponent {
  private newsService = inject(NewsService);
  private router = inject(Router);
  
  searchQuery = '';
  searchResults: News[] = [];
  menuOpen = false;
  private searchTimeout: any;

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/'], { queryParams: { q: this.searchQuery } });
      this.closeSearch();
    }
  }

  onSearchInput(): void {
    clearTimeout(this.searchTimeout);
    if (this.searchQuery.trim().length < 2) {
      this.searchResults = [];
      return;
    }
    this.searchTimeout = setTimeout(() => {
      this.newsService.searchNews(this.searchQuery).subscribe(results => {
        this.searchResults = results.slice(0, 5);
      });
    }, 300);
  }

  closeSearch(): void {
    this.searchResults = [];
    this.searchQuery = '';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
