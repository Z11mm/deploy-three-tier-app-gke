import React from 'react';

import './FacialRecognition.css';

const FacialRecognition = ({ imageUrl, boundingBox }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt4'>
        <img
          id='inputimage'
          src={imageUrl}
          alt=''
          width='500px'
          height='auto'
        />
        <div
          className='bounding-box'
          style={{
            top: boundingBox.topRow,
            left: boundingBox.leftCol,
            bottom: boundingBox.bottomRow,
            right: boundingBox.rightCol
          }}
        ></div>
      </div>
    </div>
  );
};

export default FacialRecognition;
