import {Component, OnInit} from '@angular/core';
import {Article} from '../article/article';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  articles: Array<Article>;

  constructor() {
    // this.articles = [new Article()];
    // console.log(this.articles.length);
  }

  ngOnInit(): void {
    this.articles = [new Article(), new Article(), new Article(), new Article(), new Article() ,new Article()];
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }

}
