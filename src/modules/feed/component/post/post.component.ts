import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Post, PostData } from '../../post.model';
import { PostService } from '../../services/post.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  postData: PostData

  public get dateZone() {
    return DateTime.fromISO(this.post.createdAt as string, { zone: 'local' }).toString();
  }

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService,
  ) { }

  async ngOnInit() {
    this.post.message.text.content = this.getMessage();
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  getMessage() {
    let message = this.post.message.text.content;
    var searchUsernames = message.match(/(?<=\s|^)((@)(\w)+)/g);
    if (searchUsernames) {
      var uniqueUsernames = searchUsernames.filter((value: any, index: number, array: Array<any>) => {
        return array.indexOf(value) === index;
      });

      uniqueUsernames.forEach(userName=>{
        message = message.split(userName).join(`<span class="post-mention"> ${userName.split("@")[1]} </span>`);
      })
    }


    return message;

  }


  async like() {
    this.postService.like(this.post);
    this.post.liked = true;
  }
}
