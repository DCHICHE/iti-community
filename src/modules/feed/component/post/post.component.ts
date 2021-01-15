import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  hasUrl :boolean = false;
  data :SafeResourceUrl;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.searchHTTPInText();
  }


  searchHTTPInText(){
    const regex: RegExp = new RegExp('(https|http)(:\/\/)(\\w|\\S)*', 'gm');
    const url = this.post.message.text.content.match(regex);
    if(url){
      this.hasUrl = true;
      this.data = this.sanitizer.bypassSecurityTrustResourceUrl(url[0]);
    }
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    // TODO like du post
  }
}
