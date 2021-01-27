import { Injectable } from '@angular/core';

@Injectable()
export abstract class WebsocketConnection {
  abstract on(event: string, handler: (...args: any[]) => any): void;
  abstract off(event: string, handler: (...args: any[]) => any): void;

  abstract emit(event: string, ...args: any[]): void;

  abstract connect(accessToken: string): void;
  abstract disconnect(): void;
  abstract close(): void;
}
