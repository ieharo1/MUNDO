import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { FeaturedNewsComponent } from '../../components/featured-news/featured-news.component';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FeaturedNewsComponent, 
    NewsCardComponent, 
    SidebarComponent, 
    PaginationComponent
  ],
  template: `
    <div class="container">
      @if (loading()) {
        <div class="loading">Cargando noticias...</div>
      } @else {
        @if (searchQuery()) {
          <div class="search-header">
            <h1>Resultados de búsqueda: "{{ searchQuery() }}"</h1>
            <p>{{ filteredNews().length }} noticias encontradas</p>
          </div>
        }
        
        @if (featuredNews() && !searchQuery()) {
          <section class="featured-section">
            <app-featured-news [news]="featuredNews()!"></app-featured-news>
          </section>
        }
        
        <div class="main-content">
          <div class="news-grid-container">
            @if (paginatedNews().length > 0) {
              <section class="news-section">
                @if (!searchQuery()) {
                  <h2 class="section-title">Últimas Noticias</h2>
                }
                <div class="news-grid">
                  @for (news of paginatedNews(); track news.id) {
                    <app-news-card [news]="news"></app-news-card>
                  }
                </div>
              </section>
            } @else {
              <div class="no-results">
                <p>No se encontraron noticias.</p>
              </div>
            }
            
            <app-pagination 
              [currentPage]="currentPage()"
              [totalPages]="totalPages()"
              (pageChange)="onPageChange($event)"
            ></app-pagination>
          </div>
          
          <aside class="sidebar-container">
            <app-sidebar [popularNews]="popularNews()"></app-sidebar>
          </aside>
        </div>
      }
    </div>
  `,
  styles: [`
    .search-header {
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border);
    }
    
    .search-header h1 {
      font-size: 1.75rem;
      margin-bottom: var(--spacing-xs);
    }
    
    .search-header p {
      color: var(--text-secondary);
    }
    
    .featured-section {
      margin-bottom: var(--spacing-xl);
    }
    
    .main-content {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--spacing-xl);
    }
    
    .news-grid-container {
      min-width: 0;
    }
    
    .section-title {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      padding-bottom: var(--spacing-sm);
      border-bottom: 3px solid var(--accent);
      margin-bottom: var(--spacing-lg);
      display: inline-block;
    }
    
    .news-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
    }
    
    .sidebar-container {
      min-width: 0;
    }
    
    @media (max-width: 1024px) {
      .main-content {
        grid-template-columns: 1fr;
      }
      
      .sidebar-container {
        order: -1;
      }
    }
    
    @media (max-width: 768px) {
      .news-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);
  
  allNews = signal<News[]>([]);
  featuredNews = signal<News | null>(null);
  popularNews = signal<News[]>([]);
  loading = signal(true);
  searchQuery = signal('');
  
  currentPage = signal(1);
  itemsPerPage = 6;

  filteredNews = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allNews();
    return this.allNews().filter(n => 
      n.title.toLowerCase().includes(query) ||
      n.excerpt.toLowerCase().includes(query)
    );
  });

  totalPages = computed(() => 
    Math.ceil(this.filteredNews().length / this.itemsPerPage)
  );

  paginatedNews = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredNews().slice(start, start + this.itemsPerPage);
  });

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe(news => {
      this.allNews.set(news);
      this.loading.set(false);
    });

    this.newsService.getFeaturedNews().subscribe(news => {
      if (news.length > 0) {
        this.featuredNews.set(news[0]);
      }
    });

    this.newsService.getPopularNews().subscribe(news => {
      this.popularNews.set(news);
    });

    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery.set(params['q']);
        this.currentPage.set(1);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }
}
