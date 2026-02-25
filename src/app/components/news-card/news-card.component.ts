import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <article class="news-card" [class.compact]="compact">
      <a [routerLink]="['/news', news.id]" class="card-link">
        <div class="card-image">
          <img [src]="news.image" [alt]="news.title" loading="lazy">
          <span class="badge" [ngClass]="'badge-' + news.category">
            {{ getCategoryLabel(news.category) }}
          </span>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ news.title }}</h3>
          @if (!compact) {
            <p class="card-excerpt">{{ news.excerpt }}</p>
          }
          <div class="card-meta">
            <span class="author">{{ news.author }}</span>
            <span class="date">{{ news.date | date:'dd MMM, yyyy' }}</span>
          </div>
        </div>
      </a>
    </article>
  `,
  styles: [`
    .news-card {
      background: var(--white);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: all var(--transition);
      height: 100%;
    }
    
    .news-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }
    
    .card-link {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .card-image {
      position: relative;
      overflow: hidden;
      aspect-ratio: 16/9;
    }
    
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition);
    }
    
    .news-card:hover .card-image img {
      transform: scale(1.05);
    }
    
    .card-image .badge {
      position: absolute;
      top: var(--spacing-sm);
      left: var(--spacing-sm);
    }
    
    .card-content {
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .card-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: var(--spacing-sm);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-excerpt {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: var(--spacing-md);
      flex: 1;
    }
    
    .card-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-secondary);
      padding-top: var(--spacing-sm);
      border-top: 1px solid var(--border);
    }
    
    .news-card.compact {
      flex-direction: row;
    }
    
    .news-card.compact .card-image {
      width: 120px;
      min-width: 120px;
      aspect-ratio: 1;
    }
    
    .news-card.compact .card-content {
      padding: var(--spacing-sm);
    }
    
    .news-card.compact .card-title {
      font-size: 0.875rem;
      -webkit-line-clamp: 2;
    }
    
    .news-card.compact .card-meta {
      flex-direction: column;
      gap: var(--spacing-xs);
      border-top: none;
      padding-top: 0;
    }
    
    @media (max-width: 768px) {
      .card-title {
        font-size: 1rem;
      }
    }
  `]
})
export class NewsCardComponent {
  @Input({ required: true }) news!: News;
  @Input() compact = false;

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
