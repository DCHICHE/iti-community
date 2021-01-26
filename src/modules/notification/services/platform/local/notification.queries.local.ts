import { AnyNotification } from "src/modules/notification/notification.model";
import { RoomType } from "src/modules/room/room.model";
import { NotificationQueries } from '../../notification.queries';

export class LocalNotificationQueries extends NotificationQueries {
    async getNotifications(): Promise<AnyNotification[]> {
        return [{
            timestamp: Date.now(),
            subject: "room_created",
            unread: true,
            data: {
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
            timestamp: Date.now(),
            subject: "room_created",
            unread: true,
            data: {
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
