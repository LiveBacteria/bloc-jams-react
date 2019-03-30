import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/landing/Landing';
import Library from './components/library/Library';
import Album from './components/album/Album';
import styles from './App.css'

class App extends Component {

  render() {
      const pathToLogo = '/assets/images/bloc_jams_logo.png';
    return (
        <div className="App">
          <header>
            <nav className="navBar">
                <Link to="/"><b>Landing</b></Link>
              <Link to="/library"><b>Library</b></Link>
            </nav>
            <h1>
                <img src={pathToLogo} alt="Bloc Jams"/>
            </h1>
          </header>
          <main>
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album} />
          </main>
        </div>
    );
  }
}

export default App;
