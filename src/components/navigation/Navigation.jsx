import React from 'react';
import ProfileIcon from '../profile/ProfileIcon';

const Navigation = ({ onRouteChange, isSignedIn, toggleModal, toggleAttendanceModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} toggleAttendanceModal={toggleAttendanceModal} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('signin')}
          className='f4 link dim gray underline pa3 pb0 pointer'
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange('signup')}
          className='f4 link dim gray underline pa3 pb0 pointer'
        >
          Sign Up
        </p>
      </nav>
    );
  }
};

export default Navigation;
