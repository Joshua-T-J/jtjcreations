import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-cursor',
  imports: [],
  templateUrl: './cursor.html',
  styleUrl: './cursor.scss',
})
export class Cursor implements OnInit, OnDestroy {
  x = signal(0);
  y = signal(0);
  rx = signal(0);
  ry = signal(0);
  private platformId = inject(PLATFORM_ID);
  // private timer: ReturnType<typeof setTimeout> | null = null;
  private handler!: (e: MouseEvent) => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.handler = (e: MouseEvent) => {
      this.x.set(e.clientX);
      this.y.set(e.clientY);
      // if (this.timer) clearTimeout(this.timer);
      // this.timer = setTimeout(() => {
      this.rx.set(e.clientX);
      this.ry.set(e.clientY);
      // }, 80);
    };
    document.addEventListener('mousemove', this.handler);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('mousemove', this.handler);
    }
    // if (this.timer) clearTimeout(this.timer);
  }
}
