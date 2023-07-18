import { logMessages } from '@angular-devkit/build-angular/src/tools/esbuild/utils';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public volumeIconSource: string = 'assets/img/icons/volume.svg';
  public muteIconSource: string = 'assets/img/icons/volume-mute.svg';

  public wasPlaying: boolean = false;

  public ngOnInit(): void {
    //this._addEventsToTheVideoPlayer();

    let player = document.querySelector('.player');
    let media = player?.querySelector('.media');

    let play = player?.querySelector('.player__play');
    play?.addEventListener('click', () => this.toggleMediaStatus(media, playImage));
    let playImage = play?.querySelector('img');

    let stop = player?.querySelector('.player__stop');
    stop?.addEventListener('click', () => this.stopMedia(media, playImage));

    // set current and total duration
    let duration = player?.querySelector('.player__duration');
    media?.addEventListener('durationchange', (e) => this.setInitialDuration(e, duration));

    // set values on the progress
    let timeline = player?.querySelector('.player__timeline');
    media?.addEventListener('timeupdate', (e) => this.setDuration(e, timeline, duration));

    // add the event to when the media reaches the end, then it will call the stop function reseting the video
    media?.addEventListener('ended', () => this.stopMedia(media, playImage));

    //listen to timeline event to work out when the video progress was manually changed
    timeline?.addEventListener('input', (e) => this.skipToPosition(e, media));

    // Volume mute/unmute control
    let volumeToggle = player?.querySelector('.player__mute');
    volumeToggle?.addEventListener('click', () => this.toggleVolume(volumeToggle, volume, media));

    // Volume up and down control
    let volume = player?.querySelector('.player__volume');
    volume?.addEventListener('input', (e) => this.setVolume(e, volumeToggle, media));

    // full screen
    let fullscreen = player?.querySelector('.player__fullscreen');

    // if PiP is enabled
    if (this.isPictureInPictureEnabled()) {
      console.log('PiP is supported by browser');
      // Get the reference to the Picture in picture button
      let pip = player?.querySelector('.player__pip');
      pip?.addEventListener('click', () => this.setPip(media));
    }

    // check if the TAB is in visibility so can change behaviour if user navigates away
    if (this.isInVisibleState()) {
      // console.log('Visibility is within document');
      // console.log(document.visibilityState);

      // add events to handle the visibility changes, starting value is 'visible'
      document.addEventListener('visibilitychange', (e) => this.handleVisibilityChange(e, media));
    }

    if (this.isFullScreenEnabled()) {
      fullscreen?.addEventListener('click', () => this.initFullScreen());
    }
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

  public skipToPosition(e: any, media: any) {
    // get the value of the progress bar when manually changed, and update the current progress and duration of the video
    const position = parseInt(e.target.value, 10) / 100;
    media.currentTime = media.duration * position;
  }

  public setDuration(e: any, timeline: any, duration: any) {
    // work out the progress of the video by calculating its elapsed time based on timeupdated event
    const progress = (e.target.currentTime / e.target.duration) * 100;
    const currentDuration = this.getTime(e.target.currentTime);

    timeline.value = progress;

    // update the current Duration as the video plays
    const totalDuration = this.getTime(e.target.duration);
    duration.innerText = `${ currentDuration } / ${ totalDuration }`;
  }

  public setInitialDuration(e: any, duration: any) {
    // update the duration of the video label
    const totalDuration = this.getTime(e.target.duration);
    duration.innerText = `00:00 / ${ totalDuration }`;
  }

  public setVolume(e: any, volumeToggle: any, media: any) {
    // get the value of the volume toggle and divide by 100 so it can be assigned to the media volume
    const volumePosition = parseInt(e.target.value, 10) / 100;
    media.volume = volumePosition;

    // update the icons when muted
    volumeToggle.src = media.volume > 0 ? this.volumeIconSource : this.muteIconSource;
  }

  public toggleVolume(volumeToggle: any, volume: any, media: any) {
    // toggle the value of the volume to muted or not muted
    const isMuted = media.volume === 0;

    console.log('The current value of the image is ', isMuted, media.volume, volumeToggle.src);

    volumeToggle.src = isMuted ? this.volumeIconSource : this.muteIconSource;
    volume.value = isMuted ? 100 : 0;
    media.volume = isMuted ? 1 : 0;
  }

  public setPip(media: any) {
    this.addOptionalEventsToPiP(media);

    if (this.hasEnteredPip()) {
      document.exitPictureInPicture();
    } else {
      media.requestPictureInPicture();
    }
  }

  private isPictureInPictureEnabled(): boolean {
    return 'pictureInPictureEnabled' in document;
  }

  private addOptionalEventsToPiP(media: any) {
    media.addEventListener('enterpictureinpicture', () => console.log('Entered PiP')
    );

    media.addEventListener('leavepictureinpicture', () => console.log('Left PiP')
    );
  }

  private hasEnteredPip(): boolean {
    if (document.pictureInPictureElement) {
      return true;
    }

    return false;
  }

  private isInVisibleState(): boolean {
    return 'visibilityState' in document;
  }

  private isFullScreenEnabled(): boolean {
    // check whether media has full screen functionality
    return document.fullscreenEnabled;
  }

  private async initFullScreen() {
    try {
      await document.documentElement.requestFullscreen();
    } catch (e) {
      console.log('Error ', e);
    }
  }

  private handleVisibilityChange(e: any, media: any) {
    // console.log(e.target.visibilityState); // this value will be either visible or hidden
    const visibleState = e.target.visibilityState;

    switch (visibleState) {
      case 'hidden': {
        // pause if it was playing
        if (!media.paused) {
          media.pause();
          this.wasPlaying = true;
        } else {
          this.wasPlaying = false;
        }

        break;
      }
      case 'visible': {
        // resume playing if it was playinng
        if (this.wasPlaying) {
          media.play();
        }

        break;
      }
    }
  }

  private getTime = (duration: any): string => {
    const time = parseInt(duration.toFixed(), 10);
    // @ts-ignore
    const minutes = `${ parseInt(time / 60) }`.padStart(2, 0);
    // @ts-ignore
    const seconds = `${ time % 60 }`.padStart(2, 0);

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
