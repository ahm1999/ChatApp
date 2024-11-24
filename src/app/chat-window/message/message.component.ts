import { Component, Input, OnInit } from '@angular/core';
import { Messege } from '../../services/messaging.service';
import { ChatHubService } from '../../services/chatHub.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  /**
   *
   */
  constructor(private chatHub:ChatHubService) {
    
    
  }
  
  IsByUser:string = ""; 

  ngOnInit(): void {
    if (this.Message?.senderId === this.chatHub.UserId.getValue()) {
      this.IsByUser = "ByTheUser"
    }else {
      this.IsByUser = "ByTheAddresed"
    }
  }

  @Input()
  Message :Messege|undefined;


}
