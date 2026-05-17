export interface GalleryItem {
  id: number;
  src: string;
  thumb: string;
  title: string;
  category: 'wedding' | 'event' | 'nature' | 'portrait';
  description?: string;
}

export type GalleryCategory = 'all' | 'wedding' | 'event' | 'nature' | 'portrait';
