export interface IMessage {
    id: string,
    chatId: number,
    userId: string,
    author: string,
    text: string,
    sentDate?: string
}