import { Room } from "../room/room.model";
import { User } from "../user/user.model";

export interface PostBase {
    id: string;
    likes: number;
    liked: boolean;
    roomId: string,
    createdAt: string;
    createdBy: User;
    attachementUrl?: string;
}

/**
 * Post data model returned by the server
 */
export interface PostData extends PostBase {
    message: string;
}

export interface Post extends PostBase {
    message: PostMessage;
}

export interface PostMessage {
    text: MessageTextElement;
    attachements: MessageElement[];
}

export interface MessageTextElement {
    type: 'text';
    content: string;
}

export interface MessageLinkElement {
    type: 'link';
    title: string;
    image: string;
    description: string;
}

export interface MessageYoutubeElement {
    type: 'youtube';
    videoId: string;
}

export interface MessageMediaElement<T extends string> {
    type: T;
    url: string;
}

export interface MessageImageElement extends MessageMediaElement<'image'> {
}

export interface MessageVideoElement extends MessageMediaElement<'video'> {
}

export interface MessageAudioElement extends MessageMediaElement<'audio'> {
}

export type MessageElement =
    MessageTextElement |
    MessageLinkElement |
    MessageYoutubeElement |
    MessageImageElement |
    MessageVideoElement |
    MessageAudioElement;
