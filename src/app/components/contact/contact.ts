import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface ContactFormGroup extends FormGroup {
  value: ContactFormData;
  controls: {
    name: FormControl<string>;
    phone: FormControl<string>;
    email: FormControl<string>;
    service: FormControl<string>;
    message: FormControl<string>;
  };
}
const phoneRegex = /^\d{6,12}$/;
const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/;

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly submitted = signal(false);

  form: ContactFormData = {
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  };
  private formBuilder: FormBuilder = inject(FormBuilder);
  readonly contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required, Validators.pattern(phoneRegex)],
    email: ['', [Validators.required, Validators.email, Validators.pattern(emailRegex)]],
    service: ['', Validators.required],
    message: ['', Validators.required],
  }) as ContactFormGroup;

  readonly services = [
    'Book an Event',
    'Wedding Photography',
    'Portrait Session',
    'Nature & Wildlife',
    'Pricing & Packages',
    'Other',
  ];

  readonly socials = [
    {
      label: 'f',
      icon: 'bi bi-facebook',
      title: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100076379604525',
    },
    {
      label: 'ig',
      icon: 'bi bi-instagram',
      title: 'Instagram',
      url: 'https://www.instagram.com/jtjcreations_',
      italic: true,
    },
    { label: 'wa', icon: 'bi bi-whatsapp', title: 'WhatsApp', url: 'https://wa.me/917594906242' },
    {
      label: 'yt',
      icon: 'bi bi-youtube',
      title: 'YouTube',
      url: 'https://www.youtube.com/channel/UCSGZLWjrl5dWbQuM_GJ0-9g',
    },
    {
      label: '@',
      icon: 'bi bi-envelope',
      title: 'Email',
      url: 'mailto:jtjcreations2020@gmail.com',
    },
  ];

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
  }
}
