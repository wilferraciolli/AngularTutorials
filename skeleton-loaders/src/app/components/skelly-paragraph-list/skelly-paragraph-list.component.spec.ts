import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkellyParagraphListComponent } from './skelly-paragraph-list.component';

describe('SkellyParagraphListComponent', () => {
  let component: SkellyParagraphListComponent;
  let fixture: ComponentFixture<SkellyParagraphListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkellyParagraphListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkellyParagraphListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
