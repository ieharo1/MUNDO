import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (totalPages > 1) {
      <nav class="pagination">
        <button 
          class="page-btn prev" 
          [disabled]="currentPage === 1"
          (click)="onPageChange(currentPage - 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Anterior
        </button>
        
        <div class="page-numbers">
          @for (page of getPageNumbers(); track page) {
            <button 
              class="page-btn"
              [class.active]="page === currentPage"
              (click)="onPageChange(page)"
            >
              {{ page }}
            </button>
          }
        </div>
        
        <button 
          class="page-btn next"
          [disabled]="currentPage === totalPages"
          (click)="onPageChange(currentPage + 1)"
        >
          Siguiente
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </nav>
    }
  `,
  styles: [`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-xl);
      padding-top: var(--spacing-xl);
      border-top: 1px solid var(--border);
    }
    
    .page-numbers {
      display: flex;
      gap: var(--spacing-xs);
    }
    
    .page-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--border);
      background: var(--white);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition);
      border-radius: 4px;
    }
    
    .page-btn:hover:not(:disabled) {
      border-color: var(--accent);
      color: var(--accent);
    }
    
    .page-btn.active {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--white);
    }
    
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    @media (max-width: 480px) {
      .page-btn span:not(:first-child) {
        display: none;
      }
      
      .page-numbers {
        max-width: 150px;
        overflow: hidden;
      }
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
