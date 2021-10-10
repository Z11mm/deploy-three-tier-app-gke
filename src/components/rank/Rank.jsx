import React from 'react';

const Rank = ({ name, boxes }) => {
  return (
    <div>
      <div className='white f5 center'>{`${name}, your attendance count is...`}</div>
      <div className='white f1 center'>{boxes.length}</div>
    </div>
  );
};

export default Rank;
