import { Injectable } from '@angular/core';
import { PostData } from 'src/modules/feed/post.model';
import { UserStore } from 'src/modules/user/user.store';
import { PostCommands } from '../../post.commands';
import { PostLocalStorage } from './post.storage';

@Injectable()
export class LocalPostCommands extends PostCommands {
    private storage: PostLocalStorage = new PostLocalStorage();
    constructor(private userStore: UserStore) {
        super();
    }

    async create(roomId: string, message: string, file?: File): Promise<{ id: string }> {
        const posts = this.storage.getValue();
        posts[roomId] = posts[roomId] || [];
        const post: PostData = {
            id: Math.round(Math.random() * 1000).toString(),
            comments: [],
            roomId,
            createdAt: new Date().toISOString(),
            createdBy: this.userStore.value.user!,
            liked: false,
            likes: 0,
            message
        }
        posts[roomId].push(post);
        this.storage.setValue(posts);
        return {
            id: post.id
        }
    }

    comment(postId: string, comment: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async like(roomId: string, postId: string): Promise<void> {
        const posts = this.storage.getValue();
        posts[roomId] = posts[roomId] || [];

        const post = posts[roomId].find(p => p.id === postId);
        if(!post) {
            throw Error("Post not found");
        }

        post.liked = true;
        this.storage.setValue(posts);
    }
}
