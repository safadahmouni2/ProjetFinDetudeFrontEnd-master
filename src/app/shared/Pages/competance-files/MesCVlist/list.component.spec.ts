import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalistComponent } from './Malist.component';

describe('ListComponent', () => {
  let component: MalistComponent;
  let fixture: ComponentFixture<MalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
