/**
 * React Dmarc Sift. DAG's 'Parse' node implementation
*/
'use strict';

// Entry point for DAG node
module.exports = function (got) {
  // inData contains the key/value pairs that match the given query
  const inData = got.in;

  console.log('email-sift-web: parse.js: running...');

  const results = inData.data.map(({ value: valueBuffer }) => {
    // Parse the JMAP information for each message more info here: https://docs.redsift.com/docs/server-code-jmap
    const emailJmap = JSON.parse(valueBuffer);
    const {
      id,
      threadId,
      subject,
      textBody,
      strippedHtmlBody,
      headers,
      date,
      from,
    } = emailJmap;
    const authenticationsResults = headers['Authentication-Results'] || ''
    const protocolStatus = extractProtocolStatus(authenticationsResults)
    // Not all emails contain a textBody so we do a cascade selection
    const body = textBody || strippedHtmlBody || '';    
    const wordCount = countWords(body);

    const key = `${threadId}/${id}`;
    const value = {
      id,
      body,
      subject,
      threadId,
      wordCount,
      protocolStatus,
      date,
      from,
    };

    // Emit into "messages-st" store so count can be calculated by the "Count" node
    // Emit information on the "messages" output so we can display them in the email list and detail
    return [{
      key,
      value,
      name: 'messages-st'
    }, {
      key,
      value,
      name: 'messages'
    }];
  });

  // Possible return values are: undefined, null, promises, single or an array of objects
  // return objects should have the following structure
  // {
  //   name: '<name of node output>',
  //   key: 'key1',
  //   value: '1'
  // };
  return [].concat(...results);
};

/**
 * Simple function to count number of words in a string
 */
function countWords(body) {
  let s = body.replace(/\n/gi, ' ');
  s = s.replace(/(^\s*)|(\s*$)/gi, '');
  s = s.replace(/[ ]{2,}/gi, '');
  return s.split(' ').length;
}

function extractProtocolStatus (authenticationsResults) {
  const protocols = ['dkim', 'dmarc', 'spf']
  const split = authenticationsResults.split('; ')
  const protocolStatus = {}
  split.forEach(item => {
    const [protocol, status] = item
      .split(' ')[0]
      .split('=')
    const isProtocol = protocols.some(p => p === protocol)
    if (isProtocol) {
      protocolStatus[protocol] = status
    }
  })
  return protocolStatus
}
