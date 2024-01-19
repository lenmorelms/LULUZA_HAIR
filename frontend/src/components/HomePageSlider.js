import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const HomePageSlider = () => {
    return (
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        bullets={false}
        organicArrows={true}
        interval={3000}
        // cssModule={styles}
      >
        {/* <div data-src="http://localhost:5000/images/sale.jpg" />
        <div data-src="http://localhost:5000/images/new_arrival.jpg" />
        <div data-src="http://localhost:5000/images/sale.jpg" /> */}
        <div data-src="https://luluza-server.onrender.com/images/sale.jpg" />
        <div data-src="https://luluza-server.onrender.com/images/new_arrival.jpg" />
        <div data-src="https://luluza-server.onrender.com/images/sale.jpg" />
      </AutoplaySlider>
    );
}

export default HomePageSlider;
