import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-article-action',
  templateUrl: './article-action.component.html',
  styleUrls: ['./article-action.component.scss']
})
export class ArticleActionComponent implements OnInit {

  likeCount: number;
  enableThumbsUp: boolean;
  enableThumbsDown: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.likeCount = 0;
    this.enableThumbsUp = true;
    this.enableThumbsDown = false;
  }

  incrementValue(): void {
    this.likeCount++;
    this.enableThumbsUp = this.likeCount < 9;
    this.enableThumbsDown = true;
  }

  decrementValue(): void {
    this.likeCount--;
    this.enableThumbsDown = this.likeCount > 0;
    this.enableThumbsUp = true;
  }
}
