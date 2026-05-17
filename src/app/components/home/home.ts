import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Marquee } from '../marquee/marquee';
import { About } from '../about/about';
import { Services } from '../services/services';
import { Gallery } from '../gallery/gallery';
import { Testimonials } from '../testimonials/testimonials';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  imports: [Hero, Marquee, About, Services, Gallery, Testimonials, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
