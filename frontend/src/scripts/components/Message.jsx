import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {translate} from 'react-i18next';

const Message = ({t, data}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    from: {
      name,
      email
    },
    subject,
    date,
    protocolStatus: {
      dkim,
      dmarc,
      spf,
    },
    body,
  } = data
  return <div className={`message ${isOpen && 'open'}`}>
    <div className="info">
      <span>{name}</span>
      <span>{subject}</span>
      <span>{formatDate(date)}</span>
      <span className="collapse-btn" onClick={() => {setIsOpen(!isOpen)}}>
        <CollapseIcon />
      </span>
    </div>
    <div className="summary">
      <div className="row">{email}</div>
      <div className="row">
        {t ('app:dkim-validation')} : <span className={`check ${dkim === 'pass' ? 'green' : 'red'}`}></span>
      </div>
      <div className="row">
        {t ('app:dmarc-validation')} : <span className={`check ${dmarc === 'pass' ? 'green' : 'red'}`}></span>
      </div>
      <div className="row">
        {t ('app:spf-validation')} : <span className={`check ${spf === 'pass' ? 'green' : 'red'}`}></span>
      </div>
      <div className="row">
        {t ('app:email-text')} : <p>{body}</p>
      </div>
    </div>
  </div>
}

Message.prototypes = {
  t: PropTypes.function,
  data: PropTypes.shape ({
    body: PropTypes.string,
    date: PropTypes.string,
    from: PropTypes.shape ({
      email: PropTypes.string,
      name: PropTypes.string,
    }),
    protocolStatus: PropTypes.shape ({
      dkim: PropTypes.string,
      spf: PropTypes.string,
      dmarc: PropTypes.string,
    }),
    subject: PropTypes.string,
  })
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

const CollapseIcon = ({size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
);

export default translate (['app'], {wait: true}) (Message)