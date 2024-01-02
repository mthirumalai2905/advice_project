import React, { Component } from 'react';
import axios from 'axios';
import './App.css';



class App extends Component {
  state = { advice: '', images: [], bgImageIndex: 0 };

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = async () => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const { advice } = response.data.slip;
      this.setState({ advice });
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };

  fetchBackground = async () => {
    try {
      const response = await axios.get("https://api.unsplash.com/photos/?client_id=fM3C9dmbJp1Equ8GZCJ4epM80FXL6G2pCpsMWUA2k-0&per_page=20");
      const data = response.data;
  
      this.setState((prevState) => ({ bgImageIndex: (prevState.bgImageIndex + 1) % data.length, images: data }));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  render() {
    const { advice, images, bgImageIndex } = this.state;
    const backgroundImage = images.length > 0 ? `url(${images[bgImageIndex].urls.full})` : '';
  
    return (
      <div className='app' style={{ backgroundImage }}>
        <div className='card'>
          <h1 className='heading'>{advice}</h1>
          <button className='button' onClick={() => { this.fetchAdvice(); this.fetchBackground(); }}>
            <span>GIVE ME ADVICE</span>
          </button>
          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
