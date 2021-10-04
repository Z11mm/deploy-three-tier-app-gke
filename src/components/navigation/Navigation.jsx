import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('signout')}
          className='f4 link dim gray underline pa3 pb0 pointer'
        >
          Sign Out
        </p>
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
