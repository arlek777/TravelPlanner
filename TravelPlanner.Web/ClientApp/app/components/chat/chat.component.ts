import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { MessageViewModel } from "../../models/message";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
    private chatId: number;

    message: MessageViewModel;
    messages: MessageViewModel[] = [];

    constructor(private chatService: ChatService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private backendService: BackendService) {
    }

    ngOnInit() {
        this.chatId = this.route.snapshot.params["id"];
        this.backendService.getAllMessages(this.chatId).then((messages: MessageViewModel[]) => {
            this.messages = messages;
        });

        this.message = new MessageViewModel();
        this.message.chatId = this.chatId;
        this.message.userId = this.authService.user.id;
        this.message.author = this.authService.user.userName;

        this.chatService.messages.subscribe(msg => {
            if (msg.chatId == this.chatId) {
                setTimeout(() => {
                    this.messages.push(msg);
                });
            }
        });
    }

    sendMsg() {
        this.backendService.sendMessage(this.message);
        this.message.text = '';
    }

    getMessageBoxCss(msg: MessageViewModel) {
        return this.authService.user.id === msg.userId ? "alert-info" : "alert-success";
    }
}
