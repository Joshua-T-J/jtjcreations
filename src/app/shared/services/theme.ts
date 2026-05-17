import { computed, Injectable, signal } from '@angular/core';

export type ThemeType = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly theme = signal<ThemeType>('dark');
  readonly Theme = computed(() => this.theme());
  readonly isDark = computed(() => this.theme() === 'dark');

  init(): void {
    const saved = localStorage.getItem('jtj-theme') as ThemeType | null;
    const preferred = saved ?? 'dark';
    this.applyTheme(preferred);
  }

  toggle(): void {
    const next: ThemeType = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    localStorage.setItem('jtj-theme', next);
  }

  private applyTheme(theme: ThemeType): void {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
