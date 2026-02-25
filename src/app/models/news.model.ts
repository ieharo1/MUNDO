export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'mundo' | 'economia' | 'tecnologia' | 'deportes';
  image: string;
  author: string;
  date: string;
  featured?: boolean;
}
