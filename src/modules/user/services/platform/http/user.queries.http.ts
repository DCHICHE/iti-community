import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "src/modules/user/user.model";
import { UserQueries } from "../../user.queries";

@Injectable()
export class HttpUserQueries extends UserQueries {
  constructor(private http: HttpClient) {
    super();
  }

  getUserInfo(): Promise<User> {
    return this.http.get<User>(`${environment.serverBaseUrl}/user`).toPromise();
  }

  search(search: string): Promise<User[]> {
    return this.http.get<User[]>(`${environment.serverBaseUrl}/user/search?search=${search}`).toPromise();
  }

  exists(username: string): Promise<boolean> {
    return this.http.get<boolean>(`${environment.serverBaseUrl}/user/exists?username=${username}`).toPromise();
  }
}
