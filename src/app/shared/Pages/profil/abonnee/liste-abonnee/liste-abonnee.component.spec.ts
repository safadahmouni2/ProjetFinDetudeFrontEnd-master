import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAbonneeComponent } from './liste-abonnee.component';

describe('ListeAbonneeComponent', () => {
  let component: ListeAbonneeComponent;
  let fixture: ComponentFixture<ListeAbonneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAbonneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAbonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
