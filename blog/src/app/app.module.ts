import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SectionComponent } from './section/section.component';
import { ArticleComponent } from './article/article.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SideNavNavigationComponent } from './side-nav-navigation/side-nav-navigation.component';
import { ArticleActionComponent } from './article-action/article-action.component';
import { ArticleTagsComponent } from './article-tags/article-tags.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SectionComponent,
    ArticleComponent,
    SideNavComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    SideNavNavigationComponent,
    ArticleActionComponent,
    ArticleTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
