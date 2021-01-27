import { AnyNotification } from "src/modules/notification/notification.model";
import { RoomType } from "src/modules/room/room.model";
import { NotificationQueries } from '../../notification.queries';

export class LocalNotificationQueries extends NotificationQueries {
  async getNotifications(): Promise<AnyNotification[]> {
    return [{
      id :"1",
      timestamp: Date.now(),
      subject: "room_added",
      payload: {
        user: {
          username: "",
          id: ""
        },
        room: {
          id: "",
          name: "",
          type: RoomType.Text
        }
      }
    }, {
      id :"2",
      timestamp: Date.now(),
      subject: "room_added",
      payload: {
        user: {
          username: "",
          id: ""
        },
        room: {
          id: "",
          name: "",
          type: RoomType.Text
        }
      }
    }];
  }
}
