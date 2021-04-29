import { Component } from '@angular/core';

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';




@Component({
  selector: 'app-home',
  template: ''
})
export class MockAppHomeComponent {

}

@Component({
  selector: 'app-buy-flight',
  template: ''
})
export class MockBuyFlightComponent {

}


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, MockAppHomeComponent, MockBuyFlightComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Fly Sharp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Fly Sharp');
  });

  it('should have a router-outlet tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('main router-outlet')).toBeTruthy();
  });



});
