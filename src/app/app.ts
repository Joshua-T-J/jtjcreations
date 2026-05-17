import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { Cursor } from './components/cursor/cursor';
import { Theme } from './shared/services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, Cursor],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('JtjCreations');
  private themeService = inject(Theme);
  showBackTop = false;

  ngOnInit(): void {
    this.themeService.init();
    window.addEventListener(
      'scroll',
      () => {
        this.showBackTop = window.scrollY > 440;
      },
      { passive: true },
    );
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
