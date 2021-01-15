import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';
import { RoomStore } from '../../room.store';

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  isVisible: boolean = false;
  model = new CreateRoomFormModel();

  constructor(private roomService: RoomService, private router: Router) {

  }

  ngOnInit(): void {
  }

  async onOk() {
    if (this.form.form.valid) {
      // DONE invoquer la méthode create du RoomService
      let room = await this.roomService.create(this.model.name, this.model.type);
      this.close();
      this.router.navigate(['app', room.id]);
    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.form.resetForm(new CreateRoomFormModel());
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
