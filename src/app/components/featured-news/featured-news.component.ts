import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-featured-news',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <article class="featured-news">
      <a [routerLink]="['/news', news.id]" class="featured-link">
        <div class="featured-image">
          <img [src]="news.image" [alt]="news.title" loading="lazy">
          <div class="featured-overlay"></div>
        </div>
        <div class="featured-content">
          <span class="badge" [ngClass]="'badge-' + news.category">
            {{ getCategoryLabel(news.category) }}
          </span>
          <h2 class="featured-title">{{ news.title }}</h2>
          <p class="featured-excerpt">{{ news.excerpt }}</p>
          <div class="featured-meta">
            <span class="author">Por {{ news.author }}</span>
            <span class="separator">•</span>
            <span class="date">{{ news.date | date:'dd MMMM, yyyy' }}</span>
          </div>
        </div>
      </a>
    </article>
  `,
  styles: [`
    .featured-news {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }
    
    .featured-link {
      display: block;
      position: relative;
    }
    
    .featured-image {
      position: relative;
      aspect-ratio: 21/9;
    }
    
    .featured-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .featured-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.2) 100%
      );
    }
    
    .featured-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--spacing-xl);
      color: var(--white);
    }
    
    .featured-content .badge {
      margin-bottom: var(--spacing-md);
    }
    
    .featured-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--white);
      margin-bottom: var(--spacing-sm);
      line-height: 1.3;
    }
    
    .featured-excerpt {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: var(--spacing-md);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .featured-meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .separator {
      opacity: 0.5;
    }
    
    @media (max-width: 1024px) {
      .featured-image {
        aspect-ratio: 16/9;
      }
      
      .featured-title {
        font-size: 1.5rem;
      }
    }
    
    @media (max-width: 768px) {
      .featured-content {
        padding: var(--spacing-lg);
      }
      
      .featured-title {
        font-size: 1.25rem;
      }
      
      .featured-excerpt {
        display: none;
      }
    }
  `]
})
export class FeaturedNewsComponent {
  @Input({ required: true }) news!: News;

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
