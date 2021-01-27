import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomMenuComponent } from './components/room-menu/room-menu.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RoomCreateModalComponent } from './components/room-create-modal/room-create-modal.component';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RoomCommands } from './services/room.commands';
import { LocalRoomCommands } from './services/plateform/local/room.commands.local';
import { RoomQueries } from './services/room.queries';
import { LocalRoomQueries } from './services/plateform/local/room.queries.local';
import { RoomStore } from './room.store';
import { RoomService } from './services/room.service';
import { RoomComponent } from './components/room/room.component';
import { FeedModule } from '../feed/feed.module';
import { InputModule } from '../input/input.module';
import { HttpRoomCommands } from './services/plateform/http/room.commands.http';
import { HttpRoomQueries } from './services/plateform/http/room.queries.http';
import { RoomSocketService } from './services/room.socket.service';

@NgModule({
  declarations: [RoomMenuComponent, RoomCreateModalComponent, RoomComponent],
  exports: [RoomMenuComponent, RoomComponent],
  providers: [{
    provide: RoomCommands,
    useClass: HttpRoomCommands
  },
  {
    provide: RoomQueries,
    useClass: HttpRoomQueries
  },
    RoomStore,
    RoomService,
    RoomSocketService
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzModalModule,
    NzIconModule,
    NzSelectModule,
    FeedModule,
    InputModule
  ]
})
export class RoomModule { }
