import React, {Component} from 'react';
import styles from './playerbar.css'

class PlayerBar extends Component {
    render() {
        return(
            <section className="player-bar">
                <section id="songInfo">
                    <span>
                        {this.props.currentSong.title}
                    </span>
                </section>
                <section id="buttons">
                    <button id="previous" onClick={() => this.props.handlePrevClick()}>
                        <span className="ion-md-skip-backward"></span>
                    </button>
                    <button id="play-pause" onClick={() => this.props.handleSongClick()}>
                        <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></span>
                    </button>
                    <button id="next" onClick={() => this.props.handleNextClick()}>
                        <span className="ion-md-skip-forward"></span>
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">{this.props.formattedCurrentTime}</div>
                    <input
                        type="range"
                        className="seek-bar"
                        value={this.props.currentTime / this.props.trueDuration || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeSeek}
                    />
                    <div className="total-time">{this.props.duration}</div>
                </section>
                <section id="volume-control">
                    <div className="icon ion-md-volume-low"></div>
                    <input
                        type="range"
                        className="seek-bar"
                        step="10"
                        max="100"
                        min="0"
                        value={this.props.volume}
                        onChange={this.props.handleVolumeChange}
                    />
                    <div className="icon ion-md-volume-high"></div>
                </section>
            </section>
        );
    }
}

export default PlayerBar;