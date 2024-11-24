import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActiveUsersComponent } from "./active-users/active-users.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import { ChatHubService} from './services/chatHub.service';
import { NameformComponent } from "./nameform/nameform.component";
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActiveUsersComponent, ChatWindowComponent, NameformComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy,OnInit{
  title = 'ChatApp';
  Logged:boolean  =false; 
  subscription$: Subscription|undefined;


  constructor(private chatHub:ChatHubService) {


  }
  ngOnDestroy(): void {
    this.subscription$?.unsubscribe()
  }
  ngOnInit(): void {
    this.chatHub.startConnection()
    .then(()=>{
      

    })
    .catch()
    this.subscription$ = this.chatHub.Logged.pipe(map((logged)=>{
      this.Logged = logged
    }))
    .subscribe()
    
}
}