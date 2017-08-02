import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebSocketService } from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IMessage } from "../models/message";

@Injectable()
export class ChatService {
    public messages: Subject<IMessage> = new Subject<IMessage>();

    constructor(private wsService: WebSocketService) {
        var uri = "ws://" + window.location.host + "/ws";
        this.messages = <Subject<IMessage>>this.wsService
            .connect(uri)
            .map((response: MessageEvent): IMessage => {
                let data = JSON.parse(response.data);
                return {
                    author: data.author,
                    text: data.text,
                    newDate: data.newDate
                }
            });
    }
}