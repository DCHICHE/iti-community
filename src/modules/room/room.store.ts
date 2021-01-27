import { Injectable } from '@angular/core';
import { Store } from '../common/Store';
import { Room } from './room.model';
import { RoomState } from './room.state';

@Injectable()
export class RoomStore extends Store<RoomState> {
  constructor() {
    super({
      rooms: []
    });
  }

  appendRoom(...room: Room[]) {
    this.mutate(state => {
      return {
        ...state,
        rooms: [...state.rooms, ...room]
      }
    });
  }
}
