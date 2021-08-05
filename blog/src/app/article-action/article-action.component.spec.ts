import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleActionComponent } from './article-action.component';

describe('ArticleActionComponent', () => {
  let component: ArticleActionComponent;
  let fixture: ComponentFixture<ArticleActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
