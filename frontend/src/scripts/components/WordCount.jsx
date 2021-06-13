import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';

const WordCount = ({ data }) => {
  const {
    weeklyWordCount,
    dailyWordCount,
  } = data
  return <div className="word-count">
    <WeeklyChart data={weeklyWordCount} />
    <DailyChart data={dailyWordCount} />
  </div>
}

WordCount.prototypes = {
  t: PropTypes.function,
  data: PropTypes.shape ({
    messageTotal: PropTypes.string,
    wordTotal: PropTypes.string,
    wpmTotal: PropTypes.string,
    weeklyWordCount: PropTypes.any,
    dailyWordCount: PropTypes.any,
  })
}

export default WordCount