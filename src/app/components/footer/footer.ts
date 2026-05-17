import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly year = new Date().getFullYear();

  readonly navLinks = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/', anchor: '#about' },
    { label: 'Services', path: '/', anchor: '#services' },
    { label: 'Contact', path: '/', anchor: '#contact' },
  ];

  readonly services = [
    'Wedding Photography',
    'Event Coverage',
    'Portrait Sessions',
    'Nature & Wildlife',
    'Photo Editing',
  ];

  readonly socials = [
    {
      label: 'f',
      title: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100076379604525',
    },
    {
      label: 'ig',
      title: 'Instagram',
      url: 'https://www.instagram.com/jtjcreations_',
      italic: true,
    },
    { label: 'wa', title: 'WhatsApp', url: 'https://wa.me/917594906242' },
    {
      label: 'yt',
      title: 'YouTube',
      url: 'https://www.youtube.com/channel/UCSGZLWjrl5dWbQuM_GJ0-9g',
    },
  ];
}
