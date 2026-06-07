import { Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { GalleryItem } from '../../shared/models/gallery';
import { RouterLink } from '@angular/router';
import { AssetFile, Entry } from 'contentful';
import { Contentful } from '../../shared/services/contentful';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  private destroyRef = inject(DestroyRef);
  private contentfulService = inject(Contentful);

  readonly lightboxSrc = signal<string | null>(null);
  readonly lightboxAlt = signal<string>('');
  readonly homeItems = signal<GalleryItem[]>([]);

  ngOnInit(): void {
    this.getProtfolioData();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.lightboxSrc()) {
      this.closeLightbox();
    }
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

  getProtfolioData() {
    this.contentfulService
      .getGalleryItems({ limit: 6 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Entry<any>[]) => {
          const items: GalleryItem[] = res.map((entry) => {
            let imageUrl = '';
            const imageField = entry.fields?.['image'] as Entry<any> | undefined;
            const file = imageField?.fields?.['file'] as AssetFile | undefined;
            if (file?.url) {
              imageUrl = file.url;
            }
            return { ...entry.fields, src: imageUrl } as GalleryItem;
          });
          this.homeItems.set(items);
        },
      });
  }
}
