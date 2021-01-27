import { Observable } from 'rxjs';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { Store } from '../common/Store';
import { FeedState } from './feed.state';
import { Post } from './post.model';

export class FeedStore extends Store<FeedState> {
  roomId$: Observable<string | undefined>;
  constructor() {
    super({
      posts: []
    });
    this.roomId$ = this.get(s => s.roomId).pipe(distinctUntilChanged());
  }

  appendPost(...posts: Post[]) {
    this.mutate(s => {
      return {
        ...s,
        posts: [...s.posts, ...posts]
      }
    });
  }

  prependPost(...posts: Post[]) {
    this.mutate(s => {
      return {
        ...s,
        posts: [...posts, ...s.posts,]
      }
    });
  }

  onRoomIdChange(callback: (roomId: string | undefined) => any) {
    this.roomId$.pipe(
    ).subscribe(roomId => {
      callback(roomId);
    });
  }
}
