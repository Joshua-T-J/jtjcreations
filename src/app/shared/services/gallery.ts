import { Injectable, signal } from '@angular/core';
import { GalleryCategory, GalleryItem } from '../models/gallery';

@Injectable({
  providedIn: 'root',
})
export class Gallery {
  readonly allItems: GalleryItem[] = [
    {
      id: 1,
      src: 'https://jtjcreations.netlify.app/img/slider1.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/slider1.jpg',
      title: 'Wedding Bliss',
      category: 'wedding',
      description: 'A timeless celebration of love and togetherness.',
    },
    {
      id: 2,
      src: 'https://jtjcreations.netlify.app/img/slider2.JPG',
      thumb: 'https://jtjcreations.netlify.app/img/slider2.JPG',
      title: 'Moments of Love',
      category: 'wedding',
      description: 'Candid moments frozen in time forever.',
    },
    {
      id: 3,
      src: 'https://jtjcreations.netlify.app/img/slider5.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/slider5.jpg',
      title: 'Cherished Forever',
      category: 'wedding',
      description: 'Every glance, every smile, preserved eternally.',
    },
    {
      id: 4,
      src: 'https://jtjcreations.netlify.app/img/events.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/events.jpg',
      title: 'Special Events',
      category: 'event',
      description: 'From baptisms to corporate milestones.',
    },
    {
      id: 5,
      src: 'https://jtjcreations.netlify.app/img/album.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/album.jpg',
      title: 'Album & Edits',
      category: 'event',
      description: 'Professional editing that elevates every frame.',
    },
    {
      id: 6,
      src: 'https://jtjcreations.netlify.app/img/nature.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/nature.jpg',
      title: "Nature's Beauty",
      category: 'nature',
      description: 'The wilderness translated into breathtaking art.',
    },
    {
      id: 7,
      src: 'https://jtjcreations.netlify.app/img/slider1.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/slider1.jpg',
      title: 'Sacred Vows',
      category: 'wedding',
      description: 'Two souls united in sacred ceremony.',
    },
    {
      id: 8,
      src: 'https://jtjcreations.netlify.app/img/slider2.JPG',
      thumb: 'https://jtjcreations.netlify.app/img/slider2.JPG',
      title: 'First Dance',
      category: 'wedding',
      description: 'The magic of the first dance, immortalized.',
    },
    {
      id: 9,
      src: 'https://jtjcreations.netlify.app/img/events.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/events.jpg',
      title: 'Birthday Joy',
      category: 'event',
      description: 'Celebrations filled with laughter and light.',
    },
    {
      id: 10,
      src: 'https://jtjcreations.netlify.app/img/nature.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/nature.jpg',
      title: 'Golden Hour',
      category: 'nature',
      description: "Kerala's golden light at dusk.",
    },
    {
      id: 11,
      src: 'https://jtjcreations.netlify.app/img/about.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/about.jpg',
      title: 'Portrait Session',
      category: 'portrait',
      description: 'Capturing personality in a single frame.',
    },
    {
      id: 12,
      src: 'https://jtjcreations.netlify.app/img/slider5.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/slider5.jpg',
      title: 'Family Moments',
      category: 'portrait',
      description: 'Bonds that last a lifetime, captured forever.',
    },
    {
      id: 13,
      src: 'https://jtjcreations.netlify.app/img/slider1.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/slider1.jpg',
      title: 'Bridal Elegance',
      category: 'wedding',
      description: 'Bridal beauty captured with artful precision.',
    },
    {
      id: 14,
      src: 'https://jtjcreations.netlify.app/img/album.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/album.jpg',
      title: 'Reception Night',
      category: 'wedding',
      description: 'An evening of celebration and dancing.',
    },
    {
      id: 15,
      src: 'https://jtjcreations.netlify.app/img/nature.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/nature.jpg',
      title: 'Kerala Backwaters',
      category: 'nature',
      description: "The serene beauty of God's Own Country.",
    },
    {
      id: 16,
      src: 'https://jtjcreations.netlify.app/img/events.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/events.jpg',
      title: 'Corporate Event',
      category: 'event',
      description: 'Professional coverage for business milestones.',
    },
    {
      id: 17,
      src: 'https://jtjcreations.netlify.app/img/about.jpg',
      thumb: 'https://jtjcreations.netlify.app/img/about.jpg',
      title: 'Lifestyle Portrait',
      category: 'portrait',
      description: 'Authentic moments, naturally composed.',
    },
    {
      id: 18,
      src: 'https://jtjcreations.netlify.app/img/slider2.JPG',
      thumb: 'https://jtjcreations.netlify.app/img/slider2.JPG',
      title: 'Pre-Wedding Shoot',
      category: 'wedding',
      description: 'Romance framed before the big day.',
    },
  ];

  readonly activeCategory = signal<GalleryCategory>('all');

  get filteredItems(): GalleryItem[] {
    const cat = this.activeCategory();
    return cat === 'all' ? this.allItems : this.allItems.filter((i) => i.category === cat);
  }

  setCategory(cat: GalleryCategory): void {
    this.activeCategory.set(cat);
  }

  getHomeItems(): GalleryItem[] {
    return this.allItems.slice(0, 6);
  }
}
