import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Slide {
  bg: string;
  label: string;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly slides: Slide[] = [
    { bg: 'images/slider1.jpg', label: 'Wedding Photography' },
    { bg: 'images/slider2.jpg', label: 'Event Coverage' },
    { bg: 'images/slider5.jpg', label: 'Portrait Sessions' },
  ];

  readonly currentSlide = signal(0);
  private interval: ReturnType<typeof setInterval> | null = null;

  readonly stats = [
    { num: '5+', label: 'Years of Passion' },
    { num: '300+', label: 'Events Captured' },
    { num: '∞', label: 'Memories Made' },
  ];

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.currentSlide.update((i) => (i + 1) % this.slides.length);
    }, 5200);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }
}
