import React from 'react';

import './FacialRecognition.css';

const FacialRecognition = ({ imageUrl, boundingBoxes }) => {
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
        {boundingBoxes.map(box => {
          return (<div
            key={box.topRow}
            className="bounding-box"
            style={{
              top: box.topRow,
              left: box.leftCol,
              bottom: box.bottomRow,
              right: box.rightCol,
            }}
          ></div>);
        })
          }
      </div>
    </div>
  );
};

export default FacialRecognition;
