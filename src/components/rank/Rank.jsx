import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f5 center'>{`${name}, your entry count is...`}</div>
      <div className='white f1 center'>{entries}</div>
    </div>
  );
};

export default Rank;
