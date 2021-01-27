import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RoomType, Room } from "src/modules/room/room.model";
import { RoomCommands } from "../../room.commands";

@Injectable()
export class HttpRoomCommands extends RoomCommands {
  constructor(private http: HttpClient) {
    super();
  }

  create(name: string, type: RoomType): Promise<Room> {
    return this.http.post<Room>(`${environment.serverBaseUrl}/room`, { name, type }).toPromise();
  }
}
