import React from 'react';
import './header.css';
import fight from '../imgs/starwars-fight.gif';
import robo from '../imgs/starwars-run-robo.gif';

function Header() {
  return (
    <header>
      <img className="starwars-fight" src={ fight } alt="luta starwars" />
      <div>
        <h1 className="star-wars">Star Wars</h1>
        <h1 className="planets-search">Planets Search</h1>
      </div>
      <img className="starwars-run-robo" src={ robo } alt="robo starwars" />
    </header>
  );
}

export default Header;
