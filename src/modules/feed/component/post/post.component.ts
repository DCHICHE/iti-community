import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Post, PostData } from '../../post.model';
import { PostService } from '../../services/post.service';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  post: Post;

  postData: PostData

  private subscription: Subscription | null;

  public get dateZone() {
    return DateTime.fromMillis(parseInt(this.post.createdAt), { zone: 'local' }).toString();
  }

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService,
  ) {

  }

  async ngOnInit() {
    this.post.message.text.content = this.getMessage();
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
    this.subscription = this.postService.hasIdToRedirect.subscribe(id => {
      if (this.post.id === id) {
        var element = document.getElementById(this.post.id);
        element?.style.setProperty("background", "green")
        element?.scrollIntoView({
          block: "center",
          inline: "end",
        });
        this.postService.setIdToRedirect(null);


        setTimeout(function () {
          element?.style.setProperty("background", "white");
        }, 1500);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  getMessage() {
    let message = this.post.message.text.content;
    var searchUsernames = message.match(/(?<=\s|^)((@)(\w)+)/g);
    if (searchUsernames) {
      var uniqueUsernames = searchUsernames.filter((value: any, index: number, array: Array<any>) => {
        return array.indexOf(value) === index;
      });

      uniqueUsernames.forEach(userName => {
        message = message.split(userName).join(`<span class="post-mention"> ${userName.split("@")[1]} </span>`);
      })
    }


    return message;

  }

  async like() {
    if (!this.post.liked) {
      this.postService.like(this.post);
      this.post.liked = true;
    }
  }
}
