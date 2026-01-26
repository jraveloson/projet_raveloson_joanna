import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPollutionComponent } from './details-pollution.component';

describe('DetailsPollutionComponent', () => {
  let component: DetailsPollutionComponent;
  let fixture: ComponentFixture<DetailsPollutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPollutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
