import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public menuItems: Array<string> = ['dashboard', 'sales', 'orders', 'customers', 'products'];

  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
                                               .pipe(
                                                 map((result: BreakpointState) => result.matches),
                                                 shareReplay()
                                               );
}
