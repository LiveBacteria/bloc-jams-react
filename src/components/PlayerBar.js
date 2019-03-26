import React, {Component} from 'react';

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
                    <div className="current-time">-:--</div>
                    <input type="range" className="seek-bar" defaultValue="0" />
                </section>
                <section id="volume-control">
                    <div className="icon ion-md-volume-low"></div>
                    <input type="range" className="seek-bar" defaultValue="80"/>
                    <div className="icon ion-md-volume-high"></div>
                </section>
            </section>
        );
    }
}

export default PlayerBar;