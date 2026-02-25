import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <aside class="sidebar">
      <h3 class="section-title">Noticias Populares</h3>
      <div class="popular-list">
        @for (news of popularNews; track news.id; let i = $index) {
          <article class="popular-item">
            <a [routerLink]="['/news', news.id]" class="popular-link">
              <span class="popular-number">{{ i + 1 }}</span>
              <div class="popular-content">
                <span class="badge" [ngClass]="'badge-' + news.category">
                  {{ getCategoryLabel(news.category) }}
                </span>
                <h4 class="popular-title">{{ news.title }}</h4>
                <span class="popular-date">{{ news.date | date:'dd MMM' }}</span>
              </div>
            </a>
          </article>
        }
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      background: var(--white);
      border-radius: 8px;
      padding: var(--spacing-lg);
      box-shadow: var(--shadow);
    }
    
    .section-title {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 700;
      padding-bottom: var(--spacing-sm);
      border-bottom: 3px solid var(--accent);
      margin-bottom: var(--spacing-lg);
    }
    
    .popular-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }
    
    .popular-item {
      position: relative;
    }
    
    .popular-link {
      display: flex;
      gap: var(--spacing-md);
      align-items: flex-start;
    }
    
    .popular-number {
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 700;
      color: var(--border);
      line-height: 1;
      min-width: 30px;
    }
    
    .popular-content {
      flex: 1;
    }
    
    .popular-content .badge {
      margin-bottom: var(--spacing-xs);
    }
    
    .popular-title {
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: var(--spacing-xs);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color var(--transition);
    }
    
    .popular-link:hover .popular-title {
      color: var(--accent);
    }
    
    .popular-date {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    
    @media (max-width: 1024px) {
      .sidebar {
        margin-top: var(--spacing-xl);
      }
    }
  `]
})
export class SidebarComponent {
  @Input({ required: true }) popularNews!: News[];

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
