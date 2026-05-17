import { Component, inject, signal } from '@angular/core';
import { GalleryItem } from '../../shared/models/gallery';
import { Gallery as GalleryService } from '../../shared/services/gallery';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  private galleryService = inject(GalleryService);
  readonly lightboxSrc = signal<string | null>(null);
  readonly lightboxAlt = signal<string>('');

  get items(): GalleryItem[] {
    return this.galleryService.getHomeItems();
  }

  openLightbox(item: GalleryItem): void {
    this.lightboxSrc.set(item.src);
    this.lightboxAlt.set(item.title);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxSrc.set(null);
    document.body.style.overflow = '';
  }
}
