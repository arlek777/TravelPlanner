import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { MessageViewModel } from "../../models/message";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent {
    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        // todo init initial message list
        // set message author current user

        this.chatService.messages.subscribe(msg => {
            this.messages.push(msg);
        });
    }

    sendMsg() {
        this.chatService.messages.next(this.message);
        this.message.text = '';
    }

    message: MessageViewModel;
    messages: MessageViewModel[] = [];
}
