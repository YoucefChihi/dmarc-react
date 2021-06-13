import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { html as bars } from '@redsift/d3-rs-bars'
import d3Wrap from '../libs/d3Wrap';
import { select } from 'd3-selection'

const DailyD3Chart = d3Wrap({
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
    select(node)
      .datum(datum)
      .call(chart)
  }
})

const DailyChart = ({t, data}) => {
  return <div className="chart-wrapper">
    <h3>{t ('app:daily')}</h3>
    <DailyD3Chart data={data} />
  </div>
}

DailyChart.prototypes = {
  t: PropTypes.function,
  data: PropTypes.any
}

export default translate (['app'], {wait: true}) (DailyChart)