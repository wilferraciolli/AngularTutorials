import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeForm } from './attribute-form';

describe('AttributeForm', () => {
  let component: AttributeForm;
  let fixture: ComponentFixture<AttributeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
