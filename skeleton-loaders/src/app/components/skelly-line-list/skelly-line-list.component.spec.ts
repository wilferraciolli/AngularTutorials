import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkellyLineListComponent } from './skelly-line-list.component';

describe('SkellyLineListComponent', () => {
  let component: SkellyLineListComponent;
  let fixture: ComponentFixture<SkellyLineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkellyLineListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkellyLineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
