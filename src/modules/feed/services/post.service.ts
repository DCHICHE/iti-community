import { Injectable } from '@angular/core';
import { PageModel } from 'src/modules/common/Pagination';
import { FeedStore } from 'src/modules/feed/feed.store';
import { UserStore } from 'src/modules/user/user.store';
import { Post, PostData } from '../post.model';
import { PostCommands } from './post.commands';
import { PostMapper } from './post.mapper';
import { PostQueries } from './post.queries';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class PostService {

  public hasIdToRedirect: Observable<string | null>;
  private hasIdToRedirect$: BehaviorSubject<string | null>;

  constructor(private commands: PostCommands,
    private queries: PostQueries,
    private userStore: UserStore,
    private mapper: PostMapper,
    private store: FeedStore) {
    this.hasIdToRedirect$ = new BehaviorSubject<string | null>(null);
    this.hasIdToRedirect = this.hasIdToRedirect$.asObservable();
  }

  async create(roomId: string, message: string, file?: File): Promise<PostData> {
    return this.commands.create(roomId, message, file);
  }

  async fetch(roomId: string, page: PageModel): Promise<void> {
    const pageResult = await this.queries.getLast(roomId, page);
    this.store.mutate(state => {
      return {
        ...state,
        posts: pageResult.data.map(d => this.mapper.map(d))
      }
    });
  }

  async like(post: Post) {
    // TODO appeler la méthode like sur PostCommands
    await this.commands.like(post.roomId, post.id);
  }

  setIdToRedirect(id: string | null) {
    this.hasIdToRedirect$.next(id);
  }

}
