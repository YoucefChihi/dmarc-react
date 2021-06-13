import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { html as bars } from '@redsift/d3-rs-bars'
import d3Wrap from '../libs/d3Wrap';
import { select } from 'd3-selection'

const WeeklyChart = d3Wrap({
  initialize: (node, data) => {
    const chart = bars()
      .orientation('bottom')
    const datum = Object
      .entries(data)
      .map(entry => {
        const [key, count] = entry
        const [week, year] = key.split('#')
        return {
          l: `Week ${week}`,
          v: count
        }
      })
    console.log('datum', datum)
    select(node)
      .datum(datum)
      .call(chart)
  }
})

const DailyChart = d3Wrap({
  initialize: (node, data) => {
    const chart = bars()
      .orientation('bottom')
      .labelTime('%a %d')
    const datum = Object
      .entries(data)
      .map(entry => {
        const [day, count] = entry
        return {
          l: new Date(day).getTime(),
          v: count
        }
      })
    console.log('datum', datum)
    select(node)
      .datum(datum)
      .call(chart)
  }
})

const Message = ({t, data}) => {
  const {
    weeklyWordCount,
    dailyWordCount,
  } = data
  return <div className="word-count">
    <div className="chart-wrapper">
      <h3>{t ('app:weekly')}</h3>
      <WeeklyChart data={weeklyWordCount} />
    </div>
    <div className="chart-wrapper">
      <h3>{t ('app:daily')}</h3>
      <DailyChart data={dailyWordCount} />
    </div>
  </div>
}

Message.prototypes = {
  t: PropTypes.function,
  data: PropTypes.shape ({
    messageTotal: PropTypes.string,
    wordTotal: PropTypes.string,
    wpmTotal: PropTypes.string,
    weeklyWordCount: PropTypes.any,
    dailyWordCount: PropTypes.any,
  })
}

export default translate (['app'], {wait: true}) (Message)