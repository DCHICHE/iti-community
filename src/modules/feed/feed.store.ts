import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Store } from '../common/Store';
import { FeedState } from './feed.state';
import { SocketIoWebsocketConnection } from '../common/SocketIoWebsocketConnection';

export class FeedStore extends Store<FeedState> {
    roomId$: Observable<string | undefined>;

    private _webSocketConnection: BehaviorSubject<SocketIoWebsocketConnection<any> | null>;
    webSocketConnection$: Observable<SocketIoWebsocketConnection<any> | null>;
    constructor() {
        super({
            posts: []
        });
        this.roomId$ = this.get(s => s.roomId).pipe(distinctUntilChanged());

        this._webSocketConnection = new BehaviorSubject<SocketIoWebsocketConnection<any> | null>(null);
        this.webSocketConnection$ = this._webSocketConnection.asObservable();
        this._webSocketConnection.next( new SocketIoWebsocketConnection<any>('localhost'));
    }
}
