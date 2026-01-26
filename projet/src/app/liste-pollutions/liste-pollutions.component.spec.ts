import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePollutionsComponent } from './liste-pollutions.component';

describe('ListePollutionsComponent', () => {
  let component: ListePollutionsComponent;
  let fixture: ComponentFixture<ListePollutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePollutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePollutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
