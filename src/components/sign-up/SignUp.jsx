import React, { Component } from 'react';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }

  handleUsernameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSignUpSubmit = () => {
    fetch('https://fast-harbor-72819.herokuapp.com/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.createUser(user);
          this.props.onRouteChange('home');
        }
      });
  };

  render() {
    return (
      <main>
        <article className='pa4 black-80 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0'>Sign Up</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='username'>
                  Username
                </label>
                <input
                  onChange={this.handleUsernameChange}
                  className='pa2 input-reset ba bg-transparent hover-black w-100'
                  type='text'
                  name='username'
                  id='username'
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  onChange={this.handleEmailChange}
                  className='pa2 input-reset ba bg-transparent hover-black w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  onChange={this.handlePasswordChange}
                  className='b pa2 input-reset ba bg-transparent hover-black w-100'
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={this.handleSignUpSubmit}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign Up'
              />
            </div>
          </div>
        </article>
      </main>
    );
  }
}

export default SignUp;
