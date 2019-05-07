import { Component, Fragment } from 'react';

type CounterState = {
  count: number;
};

export default class Counter extends Component<{}, CounterState> {
  state: CounterState = {
    count: 0
  };

  increment = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  render() {
    const { count } = this.state;

    return (
      <Fragment>
        <p>Current count: {count}</p>
        <button onClick={this.increment}>Increment</button>
      </Fragment>
    );
  }
}
