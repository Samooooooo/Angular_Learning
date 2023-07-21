import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiernamenComponent } from './tiernamen.component';

describe('TiernamenComponent', () => {
  let component: TiernamenComponent;
  let fixture: ComponentFixture<TiernamenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiernamenComponent]
    });
    fixture = TestBed.createComponent(TiernamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
