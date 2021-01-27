import { Injectable } from "@angular/core";
import { WebSocketTopic } from "src/modules/common/WebSocketTopic";
import { Post, PostBase, PostData } from "../post.model";
import { PostMapper } from "./post.mapper";

@Injectable()
export class FeedSocketService {
  private postSubscription?: [string, (post: PostBase) => any];

  constructor(private socketToic: WebSocketTopic, private mapper: PostMapper) {
  }

  onNewPost(roomId: string, callback: (post: Post) => any) {
    if (this.postSubscription) {
      this.socketToic.unsubscribe(`room_${this.postSubscription[0]}_posts`, this.postSubscription[1]);
    }
    const cb = (post: PostData) => {
      return callback(this.mapper.map(post));
    }
    this.postSubscription = [roomId, cb];
    this.socketToic.subscribe(`room_${roomId}_posts`, cb);
  }

}
