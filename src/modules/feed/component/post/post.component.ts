import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Post, PostData } from '../../post.model';
import { PostService } from '../../services/post.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  postData : PostData

  public get dateZone(){
    return DateTime.fromISO( this.post.createdAt as string, {zone: 'local'} ).toString();
  }

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService,
  ) { }

  async ngOnInit() {
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    this.postService.like(this.post);
    this.post.liked = true;
  }
}
