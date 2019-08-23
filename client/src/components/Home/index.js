import React from "react";
import homeImage from "../../assets/images/main.jpg";

const Home = () => {
  return (
    <div>
      <h1>We give you the good news!</h1>
      <img className="home--image" src={homeImage} alt="main" />
    </div>
  );
};

export default Home;
