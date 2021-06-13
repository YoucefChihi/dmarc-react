/**
 * React Dmarc Sift. DAG's 'Count' node implementation
 */
'use strict';

// Entry point for DAG node
module.exports = function (got) {
  const inData = got.in;
  const messages = inData.data.map(({ key, value }) => {
    try {
      return { key, value: JSON.parse(value) };
    }
    catch (err) {
      console.error('email-sift-web: count.js: something went wrong with input:', e);
      return null;
    }
  }).filter(i => i);


  console.log('email-sift-web: count.js: running...');
  const dailyWordCount = {} // dailyWordCount keys will be a date format: YYYY-MM-DD
  const weeklyWordCount = {} // weeklyWordCount keys will follow format weeknumber#year
  let totalWordCount = 0
  messages.forEach(message => {
    const { value: { wordCount, date } } = message;
    const [day] = date.split('T')
    const [week, year] = getWeekNumber(day)
    const weekKey = `${week}#${year}`
    if (dailyWordCount[day]) {
      dailyWordCount[day] += wordCount
    } else {
      dailyWordCount[day] = wordCount
    }
    if (weeklyWordCount[weekKey]) {
      weeklyWordCount[weekKey] += wordCount
    } else {
      weeklyWordCount[weekKey] = wordCount
    }
    totalWordCount+= wordCount
  })

  return [
    { name: 'counts', key: 'MESSAGES', value: messages.length },
    { name: 'counts', key: 'WORDS', value: totalWordCount },
    { name: 'counts', key: 'WEEKLY', value: weeklyWordCount },
    { name: 'counts', key: 'DAILY', value: dailyWordCount },
  ];
};

function getWeekNumber(dateString) {
  const d = new Date(dateString);
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return [weekNo, d.getUTCFullYear()];
}