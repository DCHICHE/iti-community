import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Room } from "src/modules/room/room.model";
import { RoomQueries } from "../../room.queries";

@Injectable()
export class HttpRoomQueries extends RoomQueries {
  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Promise<Room[]> {
    return this.http.get<Room[]>(`${environment.serverBaseUrl}/room`).toPromise();
  }
}
