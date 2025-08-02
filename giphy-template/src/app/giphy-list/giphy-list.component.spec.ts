import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyListComponent } from './giphy-list.component';

describe('GiphyListComponent', () => {
  let component: GiphyListComponent;
  let fixture: ComponentFixture<GiphyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiphyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiphyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
