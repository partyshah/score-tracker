import React, { Component } from 'react';
import './Dice.css';

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roll: 0
    };
    this.routeToHome = this.routeToHome.bind(this);
  }

  async rollDice() {
    this.getRoll().then(result => {
      this.setState({ roll: result });
    })
  }

  async getRoll() {
    const res = await fetch('/api/roll');
    const resJson = res.json();
    return resJson;
  }

  routeToHome() {
    const path = "/";
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <h1 className="title">
          dice
        </h1>
        <h3 className="subtitle">
          your roll is
        </h3>

        <button className="roll-button" type="button" onClick={() => { this.rollDice(); }}>
          { this.state.roll }
        </button>


        <h3 className="subtitle">
          click die to roll again!
        </h3>

        <div>
          <button className="h-button" onClick={ this.routeToHome }> home </button>
        </div>
      </div>
    );
  }
}

export default Dice;
