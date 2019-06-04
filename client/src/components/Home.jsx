import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.routeToScores = this.routeToScores.bind(this);
    this.routeToDice = this.routeToDice.bind(this);
  }

  routeToScores() {
    const path = "/scores";
    this.props.history.push(path);
  }

  routeToDice() {
    const path = "/dice"
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="home">
        <div className="home-container">
          <h1 className="home-title"> hello there! </h1>
          <h3 className="home-subtitle"> welcome to score tracker :) </h3>
            <div className="route-buttons">
              <button className="home-button" onClick={this.routeToScores}>scores</button>
              <button className="home-button" onClick={this.routeToDice}>dice</button>
            </div>
        </div>
      </div>
    );
  }
}
export default Home;
