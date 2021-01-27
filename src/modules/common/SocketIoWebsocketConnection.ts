import { WebsocketConnection } from './WebsocketConnection';
import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable()
export class SocketIoWebsocketConnection extends WebsocketConnection {
  socket: Socket | null = null;
  subscriptions: [string, (...args: any[]) => any][] = [];
  events: [string, any[]][] = [];

  connect(accessToken: string) {
    const socket = io(environment.serverBaseUrl, {
      auth: {
        accessToken
      }
    });

    socket.on('connect', (s: Socket) => {
      this.socket = socket;
      console.log(socket.id);

      this.events.forEach(([event, args]) => {
        socket.emit(event, ...args);
      });

      this.subscriptions.forEach(([event, handler]) => {
        socket.on(event, handler);
      });

    });
    socket.on('disconnect', (s: Socket) => {
      this.socket = null;
      this.subscriptions = [];
      this.events = [];
    });
    socket.on('error', (e: Error) => {
      throw e;
    });
  }

  on(event: string, handler: (...args: any[]) => any): void {
    if (this.socket) {
      this.socket.on(event, handler);
    } else {
      this.subscriptions.push([event, handler]);
    }
  }

  off(event: string, handler: (...args: any[]) => any): void {
    if (this.socket) {
      this.socket.off(event, handler);
    }
    const idx = this.subscriptions.findIndex(([e, h]) => event === e && handler === h);
    if (idx > -1) {
      this.subscriptions.splice(idx, 1);
    }
  }

  emit(event: string, ...args: any[]): void {
    if (this.socket) {
      this.socket.emit(event, ...args);
    } else {
      this.events.push([event, args]);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  close(): void {
  }
}
