/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.shape({
      body: PropTypes.string,
      date: PropTypes.string,
      from: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
      }),
      id: PropTypes.string,
      protocolStatus: PropTypes.shape({
        dkim: PropTypes.string,
        spf: PropTypes.string,
        dmarc: PropTypes.string,
      }),
      subject: PropTypes.string,
      threadId: PropTypes.string,
      wordCount: PropTypes.number
    }),
  }

  render() {
    const { t, data } = this.props;
    const { counts, messages } = data;
    console.log('messssss', messages)
    return (
      <div>
        <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', {count: counts.messageTotal})}</h4>
        { messages.map((m, key) => <div key={key}><p>{m.subject}</p></div>) }
      </div>
    );
  }
}

export default translate(['app'], { wait: true })(App);
