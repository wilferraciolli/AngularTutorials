import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkellyAlingListComponent } from './skelly-aling-list.component';

describe('SkellyAlingListComponent', () => {
  let component: SkellyAlingListComponent;
  let fixture: ComponentFixture<SkellyAlingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkellyAlingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkellyAlingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
