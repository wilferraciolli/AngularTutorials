import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ProviderUseClassComponent } from '../provider-use-class/provider-use-class.component';
import { ProviderUseExistingComponent } from '../provider-use-existing/provider-use-existing.component';
import { ProviderUseFactoryComponent } from '../provider-use-factory/provider-use-factory.component';
import { ProviderUseValueComponent } from '../provider-use-value/provider-use-value.component';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatDivider,
    ProviderUseValueComponent,
    ProviderUseClassComponent,
    ProviderUseExistingComponent,
    ProviderUseFactoryComponent
  ],
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.scss'
})
export class ProviderListComponent {

}
