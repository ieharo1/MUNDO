import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, NewsCardComponent, PaginationComponent],
  template: `
    <div class="container">
      <header class="category-header">
        <nav class="breadcrumb">
          <a routerLink="/">Inicio</a>
          <span class="separator">/</span>
          <span class="current">{{ getCategoryLabel(category()) }}</span>
        </nav>
        <h1>{{ getCategoryLabel(category()) }}</h1>
        <p class="category-description">{{ getCategoryDescription() }}</p>
      </header>
      
      @if (loading()) {
        <div class="loading">Cargando noticias...</div>
      } @else {
        @if (categoryNews().length > 0) {
          <div class="news-grid">
            @for (news of paginatedNews(); track news.id) {
              <app-news-card [news]="news"></app-news-card>
            }
          </div>
          
          <app-pagination 
            [currentPage]="currentPage()"
            [totalPages]="totalPages()"
            (pageChange)="onPageChange($event)"
          ></app-pagination>
        } @else {
          <div class="no-results">
            <p>No hay noticias en esta categoría.</p>
            <a routerLink="/" class="btn btn-primary">Ver todas las noticias</a>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .category-header {
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border);
    }
    
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-md);
    }
    
    .breadcrumb a {
      color: var(--accent);
    }
    
    .breadcrumb a:hover {
      text-decoration: underline;
    }
    
    .separator {
      opacity: 0.5;
    }
    
    .current {
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .category-header h1 {
      font-size: 2.5rem;
      margin-bottom: var(--spacing-sm);
    }
    
    .category-description {
      font-size: 1.125rem;
      color: var(--text-secondary);
    }
    
    .news-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-lg);
    }
    
    @media (max-width: 1024px) {
      .news-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .news-grid {
        grid-template-columns: 1fr;
      }
      
      .category-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class CategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);
  
  category = signal<string>('');
  categoryNews = signal<News[]>([]);
  loading = signal(true);
  currentPage = signal(1);
  itemsPerPage = 6;

  totalPages = computed(() => 
    Math.ceil(this.categoryNews().length / this.itemsPerPage)
  );

  paginatedNews = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.categoryNews().slice(start, start + this.itemsPerPage);
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cat = params.get('category') || '';
      this.category.set(cat);
      this.currentPage.set(1);
      
      if (cat) {
        this.newsService.getNewsByCategory(cat).subscribe(news => {
          this.categoryNews.set(news);
          this.loading.set(false);
        });
      } else {
        this.loading.set(false);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      mundo: 'Mundo',
      economia: 'Economía',
      tecnologia: 'Tecnología',
      deportes: 'Deportes'
    };
    return labels[category] || category;
  }

  getCategoryDescription(): string {
    const descriptions: Record<string, string> = {
      mundo: 'Las noticias más importantes del mundo entero.',
      economia: 'Información financiera y económica actualizada.',
      tecnologia: 'Últimas innovaciones y tendencias tecnológicas.',
      deportes: 'Cobertura completa de eventos deportivos.'
    };
    return descriptions[this.category()] || 'Todas las noticias';
  }
}
