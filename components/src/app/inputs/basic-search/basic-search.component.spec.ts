import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSearchComponent } from './basic-search.component';

describe('BasicSearchComponent', () => {
  let component: BasicSearchComponent;
  let fixture: ComponentFixture<BasicSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
