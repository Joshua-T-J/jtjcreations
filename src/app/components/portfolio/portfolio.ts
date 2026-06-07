import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { GalleryItem, GalleryCategory } from '../../shared/models/gallery';
import { Gallery } from '../../shared/services/gallery';
import { RouterLink } from '@angular/router';
import { Contentful } from '../../shared/services/contentful';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AssetFile, Entry } from 'contentful';

interface CategoryOption {
  key: GalleryCategory;
  label: string;
  count: number;
}
type GalleryHeroData = {
  description: string;
  header: string;
  heroData: {
    Shots: number;
    Years: number;
    GalleryPieces: number;
  };
};

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements AfterViewInit, OnInit {
  private galleryService = inject(Gallery);
  private contentfulService = inject(Contentful);
  private destroyRef = inject(DestroyRef);

  readonly lightboxItem = signal<GalleryItem | null>(null);
  readonly lightboxIndex = signal<number>(0);
  readonly heroData = signal<GalleryHeroData | null>(null);

  readonly heroDescription = computed(() => this.heroData()?.description || '');
  readonly heroHeader = computed(() => this.heroData()?.header || '');
  readonly heroStats = computed(() => this.heroData()?.heroData || null);
  readonly categories = computed<CategoryOption[]>(() => {
    const all = this.galleryService.allItems();
    return [
      { key: 'all', label: 'All Work', count: all.length },
      {
        key: 'wedding',
        label: 'Wedding',
        count: all.filter((i) => i.category === 'wedding').length,
      },
      {
        key: 'event',
        label: 'Events',
        count: all.filter((i) => i.category === 'event').length,
      },
      {
        key: 'nature',
        label: 'Nature',
        count: all.filter((i) => i.category === 'nature').length,
      },
      {
        key: 'portrait',
        label: 'Portraits',
        count: all.filter((i) => i.category === 'portrait').length,
      },
    ];
  });

  readonly activeCategory = computed(() => this.galleryService.activeCategory());

  readonly galleryItems = computed(() => this.galleryService.filteredItems());

  ngOnInit(): void {
    this.getProtfolioData();
    this.getGalleryHeroData();
  }

  ngAfterViewInit(): void {
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setCategory(cat: GalleryCategory): void {
    this.galleryService.setCategory(cat);
  }

  openLightbox(item: GalleryItem): void {
    this.lightboxItem.set(item);
    this.lightboxIndex.set(this.galleryItems().indexOf(item));
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxItem.set(null);
    document.body.style.overflow = '';
  }

  prevItem(): void {
    const items = this.galleryItems;
    const idx = (this.lightboxIndex() - 1 + items().length) % items().length;
    this.lightboxIndex.set(idx);
    this.lightboxItem.set(items()[idx]);
  }

  nextItem(): void {
    const items = this.galleryItems;
    const idx = (this.lightboxIndex() + 1) % items().length;
    this.lightboxIndex.set(idx);
    this.lightboxItem.set(items()[idx]);
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

  getProtfolioData() {
    this.contentfulService
      .getGalleryItems()
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
          this.galleryService.setGalleryItems(items);
        },
      });
  }

  getGalleryHeroData() {
    this.contentfulService
      .getGalleryHeroData()
      .pipe(
        map((res: Entry<any>[]) => (res[0]?.fields as GalleryHeroData) || null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (heroData) => this.heroData.set(heroData),
        error: () => this.heroData.set(null),
      });
  }
}
