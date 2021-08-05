import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article-tags',
  templateUrl: './article-tags.component.html',
  styleUrls: ['./article-tags.component.scss']
})
export class ArticleTagsComponent implements OnInit {

  @Input()
  tags: Array<string> = [];
  // tags: Array<string> = ['#tag1', '#tag2', '#tag3'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
