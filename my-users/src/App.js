import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="250" />
          <form>
            <input type="text" placeholder="User name..."/>
            <input type="text" placeholder="User bio..."/>
            <button type="submit">Add new user</button>
          </form>
          <div>
            <ul>
              <li>testing</li>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
