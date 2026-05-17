import { Component, HostListener, inject, signal } from '@angular/core';
import { Theme } from '../../shared/services/theme';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly themeService = inject(Theme);
  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleMobile(): void {
    const next = !this.mobileOpen();
    this.mobileOpen.set(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
    document.body.style.overflow = '';
  }

  get isDark(): boolean {
    return this.themeService.isDark;
  }
}
