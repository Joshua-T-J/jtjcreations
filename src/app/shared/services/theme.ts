import { Injectable, signal } from '@angular/core';

export type ThemeType = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  readonly theme = signal<ThemeType>('dark');

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

  get isDark(): boolean {
    return this.theme() === 'dark';
  }
}
