import React from 'react';
import { SemanticToastContainer } from 'react-semantic-toasts';

const Notification: React.FC = () => {
  return (
    <div className='Notification'
      style={{ position: 'fixed', zIndex: 10000, right: 10, bottom: 0 }}
    >
      <SemanticToastContainer position='top-right'
        animation='slide left'
      />
    </div>
  )
};

export default Notification;