import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article-action',
  templateUrl: './article-action.component.html',
  styleUrls: ['./article-action.component.scss']
})
export class ArticleActionComponent implements OnInit {

  @Input()
  darkColor: boolean;

  likeCount: number;
  enableThumbsUp: boolean;
  enableThumbsDown: boolean;
  thumbsUpDark = 'thumbsUpDark';

  constructor() {
  }

  ngOnInit(): void {
    this.likeCount = 0;
    this.enableThumbsUp = true;
    this.enableThumbsDown = false;
  }

  incrementValue(): void {
    this.likeCount++;
    this.enableThumbsUp = this.likeCount < 10;
    this.enableThumbsDown = true;
  }

  decrementValue(): void {
    this.likeCount--;
    this.enableThumbsDown = this.likeCount > 0;
    this.enableThumbsUp = true;
  }

  getThumbsDownImageBackground(darkColor: boolean): string {
    if (darkColor) {
      return 'thumbsDownLight';
    } else {
      return 'thumbsDownDark';
    }
  }

  getThumbsUpImageBackground(darkColor: boolean): string {
    if (darkColor) {
      return 'thumbsUpLight';
    } else {
      return 'thumbsUpDark';
    }
  }
}
