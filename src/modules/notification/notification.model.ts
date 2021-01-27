import { Room } from "../room/room.model";
import { User } from "../user/user.model";

export type NotificationSubject =
  | 'post_liked'
  | 'room_added'
  | 'new_user';

export interface AppNotification<TSubject extends NotificationSubject, TData extends object> {
  id: string;
  viewedAt?: number;
  timestamp: number;
  subject: TSubject;
  payload: TData;
}

export type RoomAddedNotification = AppNotification<'room_added', {
  user: User;
  room: Room;
}>;

export type PostLikedNotification = AppNotification<'post_liked', {
  user: User;
  postId: string;
  preview: string;
}>

export type NewUserNotification = AppNotification<'new_user', {
  user: User;
}>;


export type AnyNotification = RoomAddedNotification | PostLikedNotification | NewUserNotification;
