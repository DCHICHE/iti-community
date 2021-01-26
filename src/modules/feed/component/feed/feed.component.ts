import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedStore } from '../../feed.store';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit {
  @ViewChild('feed') private bottomRef: ElementRef;

  roomId$: Observable<string | undefined>;

  posts$: Observable<Post[]>;

  constructor(private postService: PostService, private store: FeedStore) {
    this.posts$ = this.store.get(s => s.posts);
    this.roomId$ = this.store.roomId$;
  }

  async ngOnInit() {
    this.roomId$.subscribe({
      next: async (roomId) => {
        if (roomId) {
          await this.postService.fetch(roomId, {
            page: 0,
            perPage: 50
          });
        }
      }
    })
  }
}
