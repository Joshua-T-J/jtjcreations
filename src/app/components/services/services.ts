import { Component } from '@angular/core';

interface Service {
  num: string;
  icon: string;
  name: string;
  desc: string;
}

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  readonly services: Service[] = [
    {
      num: '01',
      icon: '💍',
      name: 'Wedding Photography',
      desc: 'Your most sacred day, documented with elegance. Every emotion, every glance, every tear of joy — preserved forever in breathtaking imagery.',
    },
    {
      num: '02',
      icon: '🎉',
      name: 'Event Coverage',
      desc: 'Baptisms, birthdays, corporate events — we bring sharp eyes and fast reflexes to capture every unrepeatable moment with precision.',
    },
    {
      num: '03',
      icon: '🌿',
      name: 'Nature & Wildlife',
      desc: 'The wilderness speaks its own language. We translate its raw beauty into stunning imagery that stops you mid-breath.',
    },
    {
      num: '04',
      icon: '✨',
      name: 'Editing & Retouching',
      desc: 'Professional post-production with Lightroom, Photoshop & Premiere Pro — elevating every frame to its most luminous potential.',
    },
  ];
}
