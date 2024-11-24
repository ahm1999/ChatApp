import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { concat, concatMap, map, Subscription } from 'rxjs';
import { ChatHubService } from '../services/chatHub.service';

@Component({
  selector: 'app-nameform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nameform.component.html',
  styleUrl: './nameform.component.css'
})
export class NameformComponent {

constructor(private chatHub:ChatHubService) {
  
}
 
UserName: string = "";

async OnSubmit() {
  this.chatHub.Logged.next(true)
  this.chatHub.UserName.next(this.UserName)
  //await this.chatHub.startConnection()
  
  this.chatHub.setName(this.UserName)
  .then()
  .catch()
  

  }
}