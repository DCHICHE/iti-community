import { Injectable } from '@angular/core';
import { WebsocketConnection } from './WebsocketConnection';

@Injectable()
export class WebSocketTopic {
  constructor(private cnx: WebsocketConnection) {
  }

  subscribe(topic: string, handler: (...args: any[]) => any) {
    this.cnx.emit("subscribe", {
      topic
    });
    this.cnx.on(topic, handler);
    this.cnx.on("connect", () => {
      this.cnx.emit("subscribe", {
        topic
      });
    });
  }

  unsubscribe(topic: string, handler: (...args: any[]) => any) {
    this.cnx.emit("unsubscribe", {
      topic
    });
    this.cnx.off(topic, handler);
  }
}
