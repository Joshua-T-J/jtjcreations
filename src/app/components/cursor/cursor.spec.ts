import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cursor } from './cursor';

describe('Cursor', () => {
  let component: Cursor;
  let fixture: ComponentFixture<Cursor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cursor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cursor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
