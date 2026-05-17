import { Component, inject, signal } from '@angular/core';
import { GalleryItem, GalleryCategory } from '../../shared/models/gallery';
import { Gallery } from '../../shared/services/gallery';
import { RouterLink } from '@angular/router';

interface CategoryOption {
  key: GalleryCategory;
  label: string;
  count: number;
}

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  private galleryService = inject(Gallery);

  readonly lightboxItem = signal<GalleryItem | null>(null);
  readonly lightboxIndex = signal<number>(0);

  readonly categories: CategoryOption[] = [
    { key: 'all', label: 'All Work', count: this.galleryService.allItems.length },
    {
      key: 'wedding',
      label: 'Wedding',
      count: this.galleryService.allItems.filter((i) => i.category === 'wedding').length,
    },
    {
      key: 'event',
      label: 'Events',
      count: this.galleryService.allItems.filter((i) => i.category === 'event').length,
    },
    {
      key: 'nature',
      label: 'Nature',
      count: this.galleryService.allItems.filter((i) => i.category === 'nature').length,
    },
    {
      key: 'portrait',
      label: 'Portraits',
      count: this.galleryService.allItems.filter((i) => i.category === 'portrait').length,
    },
  ];

  get activeCategory(): GalleryCategory {
    return this.galleryService.activeCategory();
  }

  get items(): GalleryItem[] {
    return this.galleryService.filteredItems;
  }

  setCategory(cat: GalleryCategory): void {
    this.galleryService.setCategory(cat);
  }

  openLightbox(item: GalleryItem): void {
    this.lightboxItem.set(item);
    this.lightboxIndex.set(this.items.indexOf(item));
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxItem.set(null);
    document.body.style.overflow = '';
  }

  prevItem(): void {
    const items = this.items;
    const idx = (this.lightboxIndex() - 1 + items.length) % items.length;
    this.lightboxIndex.set(idx);
    this.lightboxItem.set(items[idx]);
  }

  nextItem(): void {
    const items = this.items;
    const idx = (this.lightboxIndex() + 1) % items.length;
    this.lightboxIndex.set(idx);
    this.lightboxItem.set(items[idx]);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxItem()) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prevItem();
    if (event.key === 'ArrowRight') this.nextItem();
  }

  trackById(_: number, item: GalleryItem): number {
    return item.id;
  }
}
