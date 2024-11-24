import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class ChatHubService {

  public hubConnection: signalR.HubConnection;
    constructor() {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7054/chat') // SignalR hub URL
        .build();

  }

  startConnection():Promise<void> {
    return this.hubConnection.start()
  }


  setName(UserName :string):Promise<void>{
    return this.hubConnection.invoke("setUser",UserName)
  }

  RemoveUser(UserId :string) :Promise<void>{
    return this.hubConnection.invoke("RemoveUser",UserId)
  }


  RecieveMessages(){
    return this.hubConnection.on('RecieveMessege', (message:any) => {
      console.log(message);
    }) 
  }

  UserData(){
    return this.hubConnection.on('UserData', (message: any) => {
      
      this.UserId.next(message.id)
      this.UserName.next(message.name)
    }) 
  }

  TurnOffAll(){
    this.hubConnection.off("UserData")
    this.hubConnection.off("RecieveMessege")
  }
     


  DisconnectFromServer():Promise<void>{
    return this.hubConnection.stop()
  }

  Logged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //Logged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  UserName:BehaviorSubject<string> = new BehaviorSubject<string>("")
  UserId:BehaviorSubject<string> = new BehaviorSubject<string>("")





}
