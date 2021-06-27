import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ showResult }) => {
  return (
    <div className="home">
      <Link to={showResult ? `/result` : `/quiz`}>
        <h2 className="home__link_this">{showResult ? 'Result' : 'Quiz'}</h2>
      </Link>
    </div>
  );
};

export default Home;
