import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemComponent } from './add-dem.component';

describe('AddDemComponent', () => {
  let component: AddDemComponent;
  let fixture: ComponentFixture<AddDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
