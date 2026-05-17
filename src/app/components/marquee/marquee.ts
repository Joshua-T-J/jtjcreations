import { Component } from '@angular/core';

@Component({
  selector: 'app-marquee',
  imports: [],
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  readonly items = [
    'Wedding Photography',
    'Event Coverage',
    'Portrait Sessions',
    'Nature & Wildlife',
    'Photo Editing',
    'Kollam Kerala',
    'JTJ Creations',
  ];
}
