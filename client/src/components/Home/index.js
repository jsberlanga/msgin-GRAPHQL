import React from "react";
import homeImage from "../../assets/images/main.jpg";
import owner from "../../assets/images/ned.jpg";

const Home = () => {
  return (
    <div className="home--container">
      <h1 className="home--title">We only give you the good news!</h1>
      <div className="home--image">
        <div className="home--image__main--container">
          <img
            className="home--image__main--image"
            src={homeImage}
            alt="main"
          />
        </div>
        <div className="home--image__rest--container">
          <h2>A word from our lord and savior</h2>
          <p>There are some things we don't want to know. Important things.</p>
          <img className="home--image__rest--image" src={owner} alt="random1" />
        </div>
      </div>
    </div>
  );
};

export default Home;
