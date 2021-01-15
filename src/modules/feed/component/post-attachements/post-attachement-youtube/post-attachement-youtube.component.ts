import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageImageElement, MessageYoutubeElement } from '../../../post.model';

@Component({
  selector: 'app-post-attachement-youtube',
  templateUrl: './post-attachement-youtube.component.html',
  styleUrls: ['./post-attachement-youtube.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostAttachementYoutubeComponent implements OnInit {

  @Input()
  element: MessageYoutubeElement;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  get url() {
    console.log(this.element.videoId)
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.element.videoId);
  }

  ngOnInit(): void {
  }
}
