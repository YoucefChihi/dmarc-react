/* eslint no-console: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import Message from './Message'
import WordCount from './WordCount'

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.shape ({
      counts: PropTypes.shape ({
        messageTotal: PropTypes.string,
        wordTotal: PropTypes.string,
        wpmTotal: PropTypes.string,
        weeklyWordCount: PropTypes.any,
        dailyWordCount: PropTypes.any,
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
    const {messages, counts} = data;
    return (
      <div>
        <h1>{t ('app:title-home')}</h1>
        <h2>{t ('app:word-count-summary')}</h2>
        <WordCount data={counts} />
        <h2>{t ('app:emails')}</h2>
        {
          messages
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map ((m, key) => <Message key={key} data={m}/>)
        }
      </div>
    );
  }
}

export default translate (['app'], {wait: true}) (App);
