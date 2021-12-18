import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeahterContentComponent } from './weahter-content.component';

describe('WeahterContentComponent', () => {
  let component: WeahterContentComponent;
  let fixture: ComponentFixture<WeahterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeahterContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeahterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
