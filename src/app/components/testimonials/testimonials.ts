import { Component, signal } from '@angular/core';

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  readonly testimonials: Testimonial[] = [
    {
      text: 'JTJ Creations captured our wedding day so beautifully. Every emotion, every glance — they preserved it all. When we look at our album, we relive every magical moment all over again.',
      author: 'Arjun & Priya',
      role: 'Wedding — Kollam, Kerala',
    },
    {
      text: 'The editing is absolutely extraordinary. They took already beautiful photographs and transformed them into something truly breathtaking. I cannot stop looking at our album.',
      author: 'Riya Nair',
      role: 'Portrait Session — Trivandrum',
    },
    {
      text: 'We booked JTJ for our corporate event and were completely blown away. Professional, fast, and the photos were delivered with exceptional quality. Highly recommended!',
      author: 'Thomas George',
      role: 'Corporate Event — Kochi',
    },
  ];

  readonly current = signal(0);
  private interval: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.current.update((i) => (i + 1) % this.testimonials.length);
    }, 6500);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  goTo(i: number): void {
    this.current.set(i);
  }
}
