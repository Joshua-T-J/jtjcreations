import { Component, computed, DOCUMENT, HostListener, inject, signal } from '@angular/core';
import { Theme } from '../../shared/services/theme';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly themeService = inject(Theme);
  private readonly document = inject(DOCUMENT);

  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);
  readonly isDark = computed(() => this.themeService.isDark());

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

  scrollToFragment(fragment: string): void {
    const el = this.document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
