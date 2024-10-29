import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkellyHeaderListComponent } from './skelly-header-list.component';

describe('SkellyHeaderListComponent', () => {
  let component: SkellyHeaderListComponent;
  let fixture: ComponentFixture<SkellyHeaderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkellyHeaderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkellyHeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
