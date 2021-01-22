import { Component, OnInit } from '@angular/core';
import { FeedStore } from 'src/modules/feed/feed.store';
import { PostMapper } from 'src/modules/feed/services/post.mapper';
import { PostService } from 'src/modules/feed/services/post.service';
import { MessageSentEventPayload } from 'src/modules/input/input.model';
import { SocketIoWebsocketConnection } from 'src/modules/common/SocketIoWebsocketConnection';
import { WebSocketTopic } from 'src/modules/common/WebSocketTopic';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {

  private wst : WebSocketTopic<any>;
  private _connection: SocketIoWebsocketConnection<any> | null;
  constructor(private postService: PostService, private mapper: PostMapper, private store: FeedStore) {
    this.store.webSocketConnection$.subscribe(websocket =>
      this._connection = websocket
    );
  }

  ngOnInit(): void {
    if (this.store.value.roomId && this._connection?.socket) {
      this.wst = new WebSocketTopic<any>(this.store.value.roomId,this._connection?.socket)
      this.wst.message$.subscribe(message =>
        this.store.mutate(s => {
        return {
          ...s,
          posts: [...s.posts, this.mapper.map(message)]
        }
      }))
    }
  }

  async onMessage(payload: MessageSentEventPayload) {
    if (!this.store.value.roomId) {
      return;
    }
    const post = await this.postService.create(this.store.value.roomId, payload.message, payload.file);
    this.store.mutate(s => {
      return {
        ...s,
        posts: [...s.posts, this.mapper.map(post)]
      }
    })
  }
}
