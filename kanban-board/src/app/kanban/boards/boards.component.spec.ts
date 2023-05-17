import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsComponent } from './boards.component';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardsComponent]
    });
    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
