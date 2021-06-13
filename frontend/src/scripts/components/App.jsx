/* eslint no-console: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import Message from './Message'

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.shape ({
      counts: PropTypes.shape ({
        messageTotal: PropTypes.string,
        wordTotal: PropTypes.string,
        wpmTotal: PropTypes.string,
      }),
      messages: PropTypes.arrayOf (
        PropTypes.shape ({
          body: PropTypes.string,
          date: PropTypes.string,
          from: PropTypes.shape ({
            email: PropTypes.string,
            name: PropTypes.string,
          }),
          id: PropTypes.string,
          protocolStatus: PropTypes.shape ({
            dkim: PropTypes.string,
            spf: PropTypes.string,
            dmarc: PropTypes.string,
          }),
          subject: PropTypes.string,
          threadId: PropTypes.string,
          wordCount: PropTypes.number,
        })
      ),
    }),
  };

  render () {
    const {t, data} = this.props;
    const {messages} = data;
    return (
      <div>
        <h1>{t ('app:title-home')}</h1>
        {messages.map ((m, key) => <Message key={key} data={m}/>)}
      </div>
    );
  }
}

export default translate (['app'], {wait: true}) (App);
