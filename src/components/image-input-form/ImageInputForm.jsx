import React from 'react';

import './ImageInputForm.css';

const ImageInputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input
            type='text'
            className='f5 pa2 w-70 center'
            onChange={onInputChange}
          />
          <button
            className='w-30 grow f5 link ph3 pv2 dib white bg-light-blue'
            onClick={onButtonSubmit}
          >
            Detect Faces
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageInputForm;
