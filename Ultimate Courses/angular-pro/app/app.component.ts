import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <!-- manually pass a component to the ngcontainer -->
      <ng-container [ngTemplateOutlet]="tmpl">
      </ng-container>

      <template #tmpl>
        Wiliam Ferraciolli : CY
      </template>

    </div>
  `
})
export class AppComponent {

  constructor() {
  }
}
