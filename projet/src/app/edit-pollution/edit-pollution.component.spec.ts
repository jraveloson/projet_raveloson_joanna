import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPollutionComponent } from './edit-pollution.component';

describe('EditPollutionComponent', () => {
  let component: EditPollutionComponent;
  let fixture: ComponentFixture<EditPollutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPollutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
