import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, NewsCardComponent],
  template: `
    <div class="container">
      @if (loading()) {
        <div class="loading">Cargando noticia...</div>
      } @else if (!news()) {
        <div class="no-results">
          <p>Noticia no encontrada.</p>
          <a routerLink="/" class="btn btn-primary">Volver al inicio</a>
        </div>
      } @else {
        <article class="news-detail">
          <header class="news-header">
            <div class="news-category">
              <a [routerLink]="['/category', news()!.category]" class="badge" [ngClass]="'badge-' + news()!.category">
                {{ getCategoryLabel(news()!.category) }}
              </a>
            </div>
            <h1 class="news-title">{{ news()!.title }}</h1>
            <p class="news-excerpt">{{ news()!.excerpt }}</p>
            <div class="news-meta">
              <span class="author">Por <strong>{{ news()!.author }}</strong></span>
              <span class="separator">•</span>
              <span class="date">{{ news()!.date | date:'dd MMMM, yyyy' }}</span>
            </div>
          </header>
          
          <figure class="news-image">
            <img [src]="news()!.image" [alt]="news()!.title">
          </figure>
          
          <div class="news-content" [innerHTML]="news()!.content"></div>
        </article>
        
        @if (relatedNews().length > 0) {
          <section class="related-news">
            <h2 class="section-title">Noticias Relacionadas</h2>
            <div class="related-grid">
              @for (item of relatedNews(); track item.id) {
                <app-news-card [news]="item"></app-news-card>
              }
            </div>
          </section>
        }
      }
    </div>
  `,
  styles: [`
    .news-detail {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .news-header {
      margin-bottom: var(--spacing-xl);
    }
    
    .news-category {
      margin-bottom: var(--spacing-md);
    }
    
    .news-title {
      font-size: 2.5rem;
      line-height: 1.2;
      margin-bottom: var(--spacing-lg);
    }
    
    .news-excerpt {
      font-size: 1.25rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: var(--spacing-lg);
    }
    
    .news-meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: 0.9375rem;
      color: var(--text-secondary);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border);
    }
    
    .separator {
      opacity: 0.5;
    }
    
    .news-image {
      margin: 0 0 var(--spacing-xl) 0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .news-image img {
      width: 100%;
      aspect-ratio: 21/9;
      object-fit: cover;
    }
    
    .news-content {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--text-primary);
    }
    
    .news-content :deep(p) {
      margin-bottom: var(--spacing-lg);
    }
    
    .news-content :deep(h2) {
      margin: var(--spacing-xl) 0 var(--spacing-md);
    }
    
    .news-content :deep(h3) {
      margin: var(--spacing-lg) 0 var(--spacing-sm);
    }
    
    .news-content :deep(ul),
    .news-content :deep(ol) {
      margin: var(--spacing-md) 0;
      padding-left: var(--spacing-xl);
    }
    
    .news-content :deep(li) {
      margin-bottom: var(--spacing-sm);
    }
    
    .news-content :deep(blockquote) {
      border-left: 4px solid var(--accent);
      padding-left: var(--spacing-lg);
      margin: var(--spacing-lg) 0;
      font-style: italic;
      color: var(--text-secondary);
    }
    
    .related-news {
      margin-top: var(--spacing-xxl);
      padding-top: var(--spacing-xl);
      border-top: 1px solid var(--border);
    }
    
    .related-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-lg);
    }
    
    @media (max-width: 1024px) {
      .related-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .news-title {
        font-size: 1.75rem;
      }
      
      .news-excerpt {
        font-size: 1.125rem;
      }
      
      .news-image img {
        aspect-ratio: 16/9;
      }
      
      .news-content {
        font-size: 1rem;
      }
      
      .related-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class NewsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);
  private title = inject(Title);
  private meta = inject(Meta);
  
  news = signal<News | null>(null);
  relatedNews = signal<News[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newsService.getNewsById(id).subscribe(news => {
        if (news) {
          this.news.set(news);
          this.updateSeo(news);
          
          this.newsService.getRelatedNews(news.category, news.id)
            .subscribe(related => this.relatedNews.set(related));
        }
        this.loading.set(false);
      });
    } else {
      this.loading.set(false);
    }
  }

  private updateSeo(news: News): void {
    this.title.setTitle(`${news.title} - MUNDO`);
    this.meta.updateTag({ name: 'description', content: news.excerpt });
    this.meta.updateTag({ property: 'og:title', content: news.title });
    this.meta.updateTag({ property: 'og:description', content: news.excerpt });
    this.meta.updateTag({ property: 'og:image', content: news.image });
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
}
