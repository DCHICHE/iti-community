import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { UserStore } from '../user.store';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';

@Injectable()
export class UserService {
  constructor(
    private queries: UserQueries,
    private commands: UserCommands,
    private store: UserStore
  ) {
  }

  async register(username: string, password: string): Promise<void> {
    await this.commands.register(username, password);
  }

  async update(user: {
    id: string,
    username?: string,
    photo?: File
  }): Promise<void> {
    const usr = await this.commands.update(user);
    this.store.mutate(s => {
      return {
        user: usr
      }
    });
  }

  async fetchInfo(): Promise<void> {
    const user = await this.queries.getUserInfo();
    this.store.mutate(s => {
      return {
        ...s,
        user
      };
    })
  }

  search(token: string): Promise<User[]> {
    return this.queries.search(token);
  }

  exist(username : string) : Promise<boolean>{
    console.debug('t')
    return this.queries.exists(username)
  }
}
