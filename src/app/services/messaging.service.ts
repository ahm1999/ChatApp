import { Injectable } from '@angular/core';
import { BehaviorSubject,map,take } from 'rxjs';
import { User } from './active-users.service';
import { ChatHubService } from './chatHub.service';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  AddressedUser:BehaviorSubject<User> = new BehaviorSubject<User>({
    id:"",
    name:""
  });
  CurrentMesseges:BehaviorSubject<Messege[]> = new BehaviorSubject<any>(null);

  constructor(private chatHub:ChatHubService,private http:HttpClient) {
    this.ListenForIncomingMessages()
   }  

   SendMessageToUser(MessegeContent:string){
    let AddressedUser =  this.AddressedUser.getValue()
    let senderId = this.chatHub.UserId.getValue()
    this.chatHub.hubConnection.invoke("SendMessageToUser",senderId,MessegeContent,AddressedUser.id).then(()=>{

        if (senderId ===AddressedUser.id  ){

          return
        }
        const newMessage :Messege = {
          id:"",
          senderId: senderId,
          recieverId :AddressedUser.id,
          messageContent :MessegeContent

        }  

        const CurrentMesseges = this.CurrentMesseges.getValue()

        const updatedMessages = [...CurrentMesseges,newMessage]

        this.CurrentMesseges.next(updatedMessages)


    }).catch(e =>{
      console.log(e);
    })

   }
  
   ListenForIncomingMessages(){
    this.chatHub.hubConnection.on("MessegeFromUser",(message:Messege)=>{
      const AddressedUser = this.AddressedUser.getValue()
 
      if (AddressedUser.id === message.senderId ){
       
        const CurrentMesseges = this.CurrentMesseges.getValue()

        const updatedMessages = [...CurrentMesseges,message]

        this.CurrentMesseges.next(updatedMessages)
        
      }
    })

   }

   GetMessegesBetweenUsers(userId1:string ,userId2:string) {

    this.http.get(`https://localhost:7054/api/Messeges/${userId1}/${userId2}`).pipe(map((messages:any) => {
      const Messeges :Messege[]  = messages.map((message:Messege) => {
          return {id :message.id ,messageContent :message.messageContent,recieverId:message.messageContent,senderId:message.senderId }
        }
        
      )
      this.CurrentMesseges.next(Messeges) 
    }),take(1))
    .subscribe()
    
  

   }


}

export interface Messege  {
id:string
messageContent:string
recieverId:string
senderId:string
}
