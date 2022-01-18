import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixCompteComponent } from './choix-compte.component';

describe('ChoixCompteComponent', () => {
  let component: ChoixCompteComponent;
  let fixture: ComponentFixture<ChoixCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
