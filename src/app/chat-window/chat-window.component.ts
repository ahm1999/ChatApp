import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatHubService } from '../services/chatHub.service';
import { BehaviorSubject, concatMap, map, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MessagingService, Messege } from '../services/messaging.service';
import { CommonModule } from '@angular/common';
import { User } from '../services/active-users.service';
import { MessageComponent } from "./message/message.component";

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule, CommonModule, MessageComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {

  
sendMessege() {
  this.MessegingService.SendMessageToUser(this.messegeInput)
}


AddressedUser:BehaviorSubject<User> | undefined;
CurrentMessege:BehaviorSubject<Messege []> |undefined;
messegeInput: string = "";
  constructor(private chatHub:ChatHubService ,private MessegingService:MessagingService){
    

  }
  ngOnDestroy(): void {
   
  }

  ngOnInit(){
    this.chatHub.RecieveMessages()
    this.chatHub.UserData()
    this.AddressedUser = this.MessegingService.AddressedUser
    this.CurrentMessege = this.MessegingService.CurrentMesseges
  }
}
