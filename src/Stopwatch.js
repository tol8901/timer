import React from 'react';
import StopwatchDisplay from './StopwatchDisplay.jsx';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
      currentTimeHr: 0,
      lastClick: 0,
    };
    
  }

  formatTime = (val) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    return value;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
    if (this.state.currentTimeMin >= 60) {
        this.setState({ currentTimeHr: this.state.currentTimeHr + 1 });
        this.setState({ currentTimeMin: 0 });
      }
  };

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
      currentTimeHr: 0,
    });
  };

  wait = () => {
        let d = new Date();
        let t = d.getTime();
        if ( (t - this.state.lastClick) < 300 ) {
            this.stop();   
        }
        this.setState({ lastClick: t });
  }

  render() {
    return (
      <div className={'stopwatch'}>
        <StopwatchDisplay
          {...this.state}
          formatTime={this.formatTime}
        />
        <div className="buttons-container">
            {this.state.running === false && (
            <button className="button" onClick={this.start}>START</button>
            )}
            {this.state.running === true && (
            <button className="button" onClick={this.stop}>STOP</button>
            )}
            <button className="button" onClick={this.wait}>Wait</button>
            <button className="button" onClick={this.reset}>RESET</button>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
