import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ChatActionTypes, Message, SendMessage, ReceiveMessage } from './types';

export const sendMessage = (message: Message): ChatActions => ({
  type: ChatActionTypes.SendMessage,
  payload: message
});

export const receiveMessage = (message: Message): ChatActions => ({
  type: ChatActionTypes.ReceiveMessage,
  payload: message
});

export const sendMessageToBot = (message: Message): ThunkAction<any, any, any, any> => (dispatch: Dispatch) => {
  dispatch(sendMessage(message));

  setTimeout(() => {
    const botMessage: Message = {
      user: 'bot',
      text: `BEEP_BOOP - ${message.text}`
    };

    dispatch(receiveMessage(botMessage));
  }, 500);
};

export type ChatActions = SendMessage | ReceiveMessage;
