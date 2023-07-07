import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  // @ts-ignore
  public globalDuration;
  // @ts-ignore
  public globalTotalDuration;

  public ngOnInit(): void {
    //this._addEventsToTheVideoPlayer();

    let player = document.querySelector('.player');
    let media = player?.querySelector('.media');


    let play = player?.querySelector('.player__play');
    play?.addEventListener('click', () => this.toggleMediaStatus(media, playImage));
    let playImage = play?.querySelector('img');

    let stop = player?.querySelector('.player__stop');
    stop?.addEventListener('click', () => this.stopMedia(media, playImage));

    // set values on the progress
    let timeline = player?.querySelector('.player__timeline');
    media?.addEventListener('timeupdate', (e) => this.setDuration(e, timeline));

    // set values on the progress
    this.globalDuration = player?.querySelector('.player__duration');
    media?.addEventListener('durationchange', (e) => this.setInitialDuration(e));
  }


  public toggleMediaStatus(media: any, playImage: any) {
    if (media.paused) {
      media.play();
      playImage.src = 'assets/img/icons/pause.svg';
    } else {
      media.pause();
      playImage.src = 'assets/img/icons/play.svg';
    }
  }

  public stopMedia(media: any, playImage: any) {
    // videos cannot be stopped, so pause then rewind it to the beginning
    media.pause();
    media.currentTime = 0;
    playImage.src = 'assets/img/icons/play.svg';
  }

  public setDuration(e: any, timeline: any) {
    // work out the progress of the video by calculating its elapsed time based on timeupdated event
    const progress = (e.target.currentTime / e.target.duration) * 100;
    const currentDuration = this.getTime(e.target.currentTime);

    timeline.value = progress;

    // update the current Duration as the video plays
    this.globalDuration.innerText = `${currentDuration} / ${this.globalTotalDuration}`;
  }

  public setInitialDuration(e: any) {
    // update the duration of the video label
    this.globalTotalDuration = this.getTime(e.target.duration);
    this.globalDuration.innerText = `00:00 / ${this.globalTotalDuration}`;
  }

  private getTime = (duration: any): string => {
    const time = parseInt(duration.toFixed(), 10);
    // @ts-ignore
    const minutes =  `${parseInt(time / 60)}`.padStart(2, 0);
    // @ts-ignore
    const seconds = `${time % 60}`.padStart(2, 0);

    return `${ minutes }:${ seconds }`;
  };

  private _addEventsToTheVideoPlayer() {
    // commons events to be added to the media
    let player = document.querySelector('.player');
    let media = player?.querySelector('.media');

    // console.log(player);
    // console.log(media);

    media?.addEventListener('durationchange', (e) => {
      console.log(e.target);
    });
    media?.addEventListener('canplay', () => {
      console.log('check that it is playable');
    });
    media?.addEventListener('canplaythrough', () => {
      console.log('Browser has download some so it can be played');
    });
    media?.addEventListener('timeupdate', () => {
      console.log('emmited every time the time changed on the video');
    });

    // Events when streaming the video
    media?.addEventListener('play', () => {
      console.log('Play');
    });
    media?.addEventListener('playing', () => {
      console.log('Playing when started or after paused');
    });
    media?.addEventListener('paused', (e: Event) => {
      console.log('Paused', e?.target);
    });
    media?.addEventListener('ended', () => {
      console.log('When finished playing');
    });
  }
}
