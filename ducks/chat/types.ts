export interface Message {
  user: string;
  text: string;
}

export enum ChatActionTypes {
  SendMessage = '[chat] SEND_MESSAGE',
  ReceiveMessage = '[chat] RECEIVE_MESSAGE'
}

export interface SendMessage {
  type: typeof ChatActionTypes.SendMessage;
  payload: Message;
}

export interface ReceiveMessage {
  type: typeof ChatActionTypes.ReceiveMessage;
  payload: Message;
}
