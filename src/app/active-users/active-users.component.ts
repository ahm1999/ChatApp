import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, map, Subscription } from 'rxjs';
import { ChatHubService } from '../services/chatHub.service';
import { ActiveUsersService,User } from '../services/active-users.service';
import { CommonModule } from '@angular/common';
import { MessagingService, Messege } from '../services/messaging.service';

@Component({
  selector: 'app-active-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-users.component.html',
  styleUrl: './active-users.component.css'
})
export class ActiveUsersComponent implements OnInit,OnDestroy{


ChooseAdressedUser(user: User) {
  this.messaging.AddressedUser.next(user)
  this.messaging.GetMessegesBetweenUsers(this.chatHub.UserId.getValue(),user.id)
}

  CurrentUsers:BehaviorSubject<Array<User>> | undefined ;

  constructor(private chatHub:ChatHubService,private activeUsers:ActiveUsersService,private messaging:MessagingService) {
    
  }
  ngOnInit(): void {
    this.activeUsers.InvokeGetUsersIds()
    .then()
    .catch()
    this.CurrentUsers = this.activeUsers.CurrentUsers

  }
  ngOnDestroy(): void {
  
  }

OnClick() {
  this.chatHub.Logged.next(false)
  this.chatHub.RemoveUser(this.chatHub.UserId.value).then(()=>{
  this.chatHub.UserName.next("")
  this.chatHub.UserId.next("")
  this.activeUsers.CurrentUsers.next(new Array<User>);
  this.messaging.AddressedUser.next({id:"",name:""})
  this.messaging.CurrentMesseges.next(new Array<Messege>)

  }).catch(e =>{
    console.log(e);
    
  })

}

}
