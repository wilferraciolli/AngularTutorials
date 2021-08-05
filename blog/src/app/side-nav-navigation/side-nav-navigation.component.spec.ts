import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavNavigationComponent } from './side-nav-navigation.component';

describe('SideNavNavigationComponent', () => {
  let component: SideNavNavigationComponent;
  let fixture: ComponentFixture<SideNavNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
