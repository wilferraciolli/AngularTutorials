import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTagsComponent } from './article-tags.component';

describe('ArticleTagsComponent', () => {
  let component: ArticleTagsComponent;
  let fixture: ComponentFixture<ArticleTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
