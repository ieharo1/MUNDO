import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private newsData$ = new BehaviorSubject<News[]>([]);
  
  private dataUrl = 'assets/data/news.json';

  constructor() {
    this.loadNews();
  }

  private loadNews(): void {
    this.http.get<News[]>(this.dataUrl).subscribe(data => {
      const sorted = this.sortByDate(data);
      this.newsData$.next(sorted);
    });
  }

  private sortByDate(news: News[]): News[] {
    return [...news].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getAllNews(): Observable<News[]> {
    return this.newsData$.asObservable();
  }

  getNewsById(id: string): Observable<News | undefined> {
    return this.newsData$.pipe(
      map(news => news.find(n => n.id === id))
    );
  }

  getNewsByCategory(category: string): Observable<News[]> {
    return this.newsData$.pipe(
      map(news => news.filter(n => n.category === category))
    );
  }

  getFeaturedNews(): Observable<News[]> {
    return this.newsData$.pipe(
      map(news => news.filter(n => n.featured).slice(0, 1))
    );
  }

  getPopularNews(): Observable<News[]> {
    return this.newsData$.pipe(
      map(news => news.slice(0, 5))
    );
  }

  searchNews(query: string): Observable<News[]> {
    const lowerQuery = query.toLowerCase();
    return this.newsData$.pipe(
      map(news => news.filter(n => 
        n.title.toLowerCase().includes(lowerQuery) ||
        n.excerpt.toLowerCase().includes(lowerQuery)
      ))
    );
  }

  getRelatedNews(category: string, currentId: string): Observable<News[]> {
    return this.newsData$.pipe(
      map(news => news
        .filter(n => n.category === category && n.id !== currentId)
        .slice(0, 3)
      )
    );
  }
}
