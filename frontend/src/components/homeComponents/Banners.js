import React from 'react';

const Banner = (props) => {
  return (
    <div className="banner-container">
      <a href={props.link}>
        <img src={props.imageUrl} alt="Banner" />
      </a>
    </div>
  );
};

export default Banner;
