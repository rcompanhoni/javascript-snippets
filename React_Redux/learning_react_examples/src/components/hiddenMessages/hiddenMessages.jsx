import React, { Component } from 'react';
import CSSModule from 'react-css-modules';
import v4 from 'uuid';
import HiddenMessage from './hiddenMessage/hiddenMessage';
import styles from './hiddenMessages.scss';

class HiddenMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        'The crow crows after midnight',
        'Bring a watch and dark clothes to the spot',
        'Jericho Jericho Go',
      ],
      showing: -1,
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      let { showing } = this.state;
      const { messages } = this.state;

      showing += 1;
      showing = (showing >= messages.length) ? -1 : showing;
      this.setState({ showing });
    }, 1000);
  }

  render() {
    const { messages } = this.state;

    const messageList = messages.map((message, i) => {
      const shouldDisplayIndex = i !== this.state.showing;
      return (
        <HiddenMessage
          key={v4()}
          hide={shouldDisplayIndex}
        >{message}
        </HiddenMessage>
      );
    });

    return (
      <div>{messageList}</div>
    );
  }
}

export default CSSModule(HiddenMessages, styles);
