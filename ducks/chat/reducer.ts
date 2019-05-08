import { Message, ChatActionTypes } from './types';
import { ChatActions } from './actions';

export interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: []
};

export const reducer = (state = initialState, action: ChatActions): ChatState => {
  switch (action.type) {
    case ChatActionTypes.SendMessage:
    case ChatActionTypes.ReceiveMessage:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};
