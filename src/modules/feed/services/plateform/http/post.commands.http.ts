import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PostData } from "src/modules/feed/post.model";
import { PostCommands } from "../../post.commands";

@Injectable()
export class HttpPostCommands extends PostCommands {
  constructor(private http: HttpClient) {
    super();
  }

  create(roomId: string, message: string, file?: File): Promise<PostData> {
    const formData = new FormData();
    formData.append("message", message);
    if (file) {
      formData.append("file", file);
    }

    return this.http.post<PostData>(`${environment.serverBaseUrl}/room/${roomId}/post`, formData).toPromise();
  }

  like(roomId: string, postId: string): Promise<void> {
    return this.http.post<void>(`${environment.serverBaseUrl}/room/${roomId}/post/${postId}/like`, {}).toPromise();
  }
}
