import { Component, ElementRef, QueryList, viewChildren } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  revealEls = viewChildren<ElementRef<HTMLElement>>('revealEl');

  readonly tools = ['Photoshop', 'Lightroom', 'Illustrator', 'Premiere Pro', 'Filmora'];

  ngAfterViewInit(): void {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    this.revealEls().forEach((el) => obs.observe(el.nativeElement));
  }
}
