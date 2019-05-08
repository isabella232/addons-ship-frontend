import { Component, Fragment } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';

import { Message, sendMessage, sendMessageToBot, ChatState } from '@/ducks/chat';
import { NextDocumentContext } from 'next/document';

type ChatPageProps = {
  sendMessage: Function;
  messages: Message[];
};

type ChatPageState = {
  text: string;
};

interface Context extends NextDocumentContext {
  store: Store;
  isServer: boolean;
}

class ChatPage extends Component<ChatPageProps, ChatPageState> {
  static getInitialProps({ isServer, store }: Context) {
    if (isServer) {
      store.dispatch(sendMessage({ user: 'server', text: 'ssr' }));
    }
  }

  state: ChatPageState = {
    text: ''
  };

  updateText = (text: string) => {
    this.setState({ text });
  };

  sendMessage = () => {
    const { text } = this.state;

    const msg: Message = {
      text,
      user: 'me'
    };

    this.props.sendMessage(msg);
  };

  render() {
    const { messages } = this.props;

    return (
      <Fragment>
        <input type="text" onChange={({ target: { value } }) => this.updateText(value)} />
        <button onClick={this.sendMessage}>Send</button>

        <div>
          {messages.map(({ user, text }, idx) => (
            <div key={idx}>
              <strong>{user}:</strong> {text}
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ chat: { messages } }: { chat: ChatState }) => ({ messages });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendMessage: (msg: Message) => {
    dispatch<any>(sendMessageToBot(msg));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
