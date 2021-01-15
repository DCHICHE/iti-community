import { Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { NzPopoverComponent, NzPopoverDirective } from 'ng-zorro-antd/popover';
import { UserService } from 'src/modules/user/services/user.service';
import { User } from 'src/modules/user/user.model';
import { MessageSentEventPayload } from '../../input.model';

@Component({
  selector: 'app-feed-input',
  templateUrl: './feed-input.component.html',
  styleUrls: ['./feed-input.component.less']
})
export class FeedInputComponent {
  @Output()
  messageSent: EventEmitter<MessageSentEventPayload> = new EventEmitter();

  @ViewChild(NzPopoverDirective)
  inputPopover: NzPopoverDirective;

  /**
   * Hold the input message
   */
  message: string = "";

  users: User[] = [];

  /**
   * Staging file to upload
   */
  file: File | null = null;

  currentMention?: RegExpMatchArray;

  supportedTypes = "image/png,image/jpeg,image/gif,image/bmp,image/bmp,video/mpeg,audio/mpeg,audio/x-wav,image/webp";

  constructor(
    private userService: UserService
  ) { }

  /**
   * Triggered when the user is selecting a mention in the list.
   * @param user The mentioned user
   */
  chooseMention(user: User) {
    if (this.currentMention) {
      this.message = this.message.substr(0, this.currentMention.index! + 1) + user.username + this.message.substr(this.currentMention.index! + this.currentMention[1].length + 1) + " ";
    }
    this.hideMentionList();
  }


  /**
   * Display the mention list
   * @param mentionMatch The mention regexp match
   */
  showMentionList(mentionMatch: RegExpMatchArray) {
    this.currentMention = mentionMatch;
    this.inputPopover.show();
  }

  /**
   * Hide the mention list
   */
  hideMentionList() {
    this.inputPopover.hide();
    this.currentMention = undefined;
  }


  /**
   * Message change evetn handler
   * @param message
   */
  onMessageChanged(message: string) {
    this.message = message;
  }

  /**
   * Close tag event handler. Trigger when the user wants to remove a file.
   */
  onCloseTag() {
    this.setFile(null);
  }

  /**
  * Event handler
  * @param file the file privded by the user
  */
  onFileUpload = (file: File) => {
    this.setFile(file);
    return false;
  }

  /**
   * InputKeyDown event handler. Used to watch "Enter" key press
   * @param e
   */
  onInputKeyDown(e: KeyboardEvent) {
    // True if "Enter" is pressed without th shift or CTRL key pressed
    if (e.key.toLowerCase() === "enter" && !e.shiftKey && !e.ctrlKey) {
      e.stopImmediatePropagation();
      e.preventDefault();
      e.stopPropagation();

      this.send();
    }
  }

  /**
   * InputKeyUp event handler. Use to watch arrows key press to know when to show mention list
   * @param e
   */
  onInputKeyUp(e: KeyboardEvent) {

  }

  async searchMentionedUsers(search: string) {
    if (!search) {
      this.users = [];
    } else {
      this.users = await this.userService.search(search);
    }
  }

  /**
   * Send the input message
   */
  send() {
    if (!this.message && !this.file) {
      return;
    }
    this.fireMessageSent();
    this.clear();
  }

  /**
   * Set an allowed file to send with the input message
   * @param file The file to send with the message
   */
  setFile(file: File | null) {
    this.file = file;
  }

  /**
   * Emit the "messageSent" event
   */
  fireMessageSent() {
    // TODO émettre l'évènement "messageSent"
    const message: MessageSentEventPayload = {
      date: new Date(),
      message: this.message,
      file: this.file || undefined
    }
    console.log(message);
    this.messageSent.emit(message);
  }

  /**
   * Clear the message to reset the input
   */
  clear() {
    this.message = "";
    this.setFile(null);
    this.inputPopover.hide();
  }
}
