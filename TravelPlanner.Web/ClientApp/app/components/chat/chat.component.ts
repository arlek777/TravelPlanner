import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { IMessage } from "../../models/message";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent {
    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.chatService.messages.subscribe(msg => {
            this.messages.push(msg);
        });
    }

    sendMsg() {
        this.chatService.messages.next(this.message);
        this.message = { author: '', text: '' };
    }

    message: IMessage = {author: '', text: ''};
    messages: IMessage[] = [];
}
