import { Injectable } from '@angular/core';
import { ChatHubService } from './chatHub.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveUsersService {

  CurrentUsers :BehaviorSubject<Array<User>> = new BehaviorSubject(new Array<User>())

  constructor(private chatHubService:ChatHubService) {
    this.RecieveActiveUsers()
    this.RecieveUserDisconnected()
    this.RecieveUserConnected()
  
   }


  RecieveActiveUsers(){
    this.chatHubService.hubConnection.on("ConnectedUsersIds",(res:any)=>{
      console.log(res);
      this.CurrentUsers.next(res.map((user:User) =>{ return  {id : user.id,name:user.name} }))
    })
  }

  InvokeGetUsersIds():Promise<void>{
    return this.chatHubService.hubConnection.invoke("GetConnectedUserIds")
  }


  RecieveUserDisconnected(){
    this.chatHubService.hubConnection.on("UserDisconnected",(res:any)=>{
      console.log("user Disconnected",res);
      this.InvokeGetUsersIds().then()
    })

  }

  RecieveUserConnected(){
    this.chatHubService.hubConnection.on("UserConnections",(res:any)=>{
      console.log("user connected");
      this.InvokeGetUsersIds().then()
    })

  }

  TurnOffActions(){
    console.log("active users actions turned of");
    
    this.chatHubService.hubConnection.off("UserDisconnected")
    this.chatHubService.hubConnection.off("ConnectedUsersIds")

  }


}
export interface User {
  id:string,
  name:string

}