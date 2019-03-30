import React, { Component } from 'react';
import albumData from './../../data/albums'
import PlayerBar from '../playerbar/PlayerBar';
import styles from './album.css';

class Album extends Component{
    constructor(props){
        super(props);
        const album = albumData.find( xy => {
            return xy.slug === this.props.match.params.slug
        });
        this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            isPaused: false,
            hoveredSong: null,
            duration: album.songs[0].duration,
            currentTime: 0,
            seekTime: null,
            formattedCurrentTime: 0,
            volume: .8
        };
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;

    }

    play() {
        //console.log("Entered play()");
        this.audioElement.play();
        this.setState({isPlaying: true});
    }

    pause() {
        console.log("Entered pause()");
        this.audioElement.pause();
        this.setState({isPlaying: false});
    }

    setSong (songObject) {
        this.audioElement.src = songObject.audioSrc;
        this.setState({currentSong: songObject})
    }

    handlePrevClick(){
        //console.log("Entered method handlePrevClick()");
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        if(newIndex === currentIndex){
            console.log("Can't go back any further! ");
        }else{
            this.setSong(newSong);
            this.play();
        }
    }

    handleNextClick() {
        //console.log("Entered method handleNextClick()");
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        if(newIndex === currentIndex){
            console.log("Can't go any further! ");
        }else{
            this.setSong(newSong);
            this.play();
        }
    }

    changeSetSong (forward) {
        if(forward && this.state.isPlaying === true){
            this.audioElement.src = this.state.album.songs[(Math.min( (this.state.album.songs.length), (this.state.album.songs.indexOf(this.state.currentSong)+1)))].audioSrc;
        }else if(!forward && this.state.isPlaying === true){
            this.audioElement.src = this.state.album.songs[(Math.max(1, (this.state.album.songs.indexOf(this.state.currentSong)-1)))];
        }else{
            return console.error("Error in method changeSetSong()\nNo song to play!");
        }
    }

    handleSongClick (songObject) {
        //console.log("Entered handleSongClick()");
        const isSameSong = (this.state.currentSong === songObject);
        if(this.state.isPlaying && isSameSong) {
            this.setState({isPaused: true});
            this.pause();
        }else{
            if(!isSameSong){this.setSong(songObject)}
            this.play();
        }
    }

    mouseOver(index){
        //console.log("Entered mouseOver(). " + index);
        this.setState({hoveredSong: index});
    }

    mouseLeave(){
        //console.log("Entered mouseLeave(). ");
        this.setState({hoveredSong: "null"});
    }

    handleNumberChange(song, index) {
        //const isSameSong = this.state.currentSong === song;
        //console.log("isSameSong value: " + isSameSong);
        if (this.state.currentSong === song && this.state.isPlaying) {
            //console.log("Rendered icon ion-md-pause");
            return (
                <span className="icon ion-md-pause"></span>
            )
        } else if (this.state.hoveredSong === index){
            if(this.state.isPlaying === false) {
                //console.log("Rendered icon ion-md-play");
                return (
                    <span className="icon ion-md-play"></span>
                );
            }else{
                //console.error("Didn't render icons for some reason. ")
                return (<span className="icon ion-md-play"></span>);
            }
        }else if(this.state.hoveredSong === index && this.state.isPlaying !== true) { //ISSAME SONG IS WRONG SOMEHOW!!! FIX ITT!
           // console.log(index + " attempted to become `ion-md-play`");
            return (<span className="icon ion-md-play"></span>);
        }else if(this.state.isPaused === true && this.state.currentSong === song){
            return (<span className="icon ion-md-play"></span>);
        //}else if(this.state.hoveredSong !== index && this.state.isPlaying){
            //return <span>{index + 1}</span>;
        } else {
            //console.log("Rendered index value");
            return (
            <span>{index + 1}</span>
            );
        }
    }
v
    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime, seekTime: this.audioElement.currentTime , formattedCurrentTime: this.formatTime(this.audioElement.currentTime) });
                if(this.state.currentTime === this.state.duration){this.handleNextClick()}
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount () {
        this.setState({seekTime: null})
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    handleTimeSeek(e) {
        const newTime = this.audioElement.duration * e.target.value;
        if(newTime >= this.state.currentTime){
            this.audioElement.currentTime = newTime;
            this.setState({ currentTime: newTime });
        }else{
            this.setState({currentTime: this.audioElement.duration / 100})
        }
    }

    formatTime (timeInSeconds) {
        console.log("Entered formatTime() with: " + timeInSeconds);
        if(typeof timeInSeconds === "number" && timeInSeconds !== 0){
            const numArr = (timeInSeconds / 60).toString().split(".");
            //return (numArr[0])+":"+(numArr[1] * 60).toString().substring(0, 2);
            const fTime = new Date(timeInSeconds*1000).toUTCString().split(" ")[4];
            const nFTime = (fTime != undefined)? fTime.substring(3, 8) : fTime;
            return nFTime;
        }else{
            return "-:--";
        }
    }

    handleVolumeChange(e) {
        const newVolume = (e.target.value / 100);
        this.audioElement.volume = newVolume;
        this.setState({volume: newVolume})
    }

    determineAlbumCover() {
        console.log("Current song is: " + this.state.currentSong);
        if(this.state.currentSong.title === this.state.album.songs[5].title){
            return '/assets/images/album_covers/cover.jpg';
        }else{
            return this.state.album.albumCover;
        }
    }

    render(){
        return(
            <section className="album">
                <section id="album-info">
                    <div className="albumCover-container">
                        <img src={this.determineAlbumCover()} alt={this.state.album.title} style={this.styledImg}/>
                    </div>
                    <div className="album-details">
                        <h1 id="album-title">
                            {this.state.album.title}
                        </h1>
                        <h2 className="artist">
                            {this.state.album.artist}
                        </h2>
                        <div id="release-info">
                            {this.state.album.releaseInfo}
                        </div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map( (item, index) =>
                            <tr className="song" key={index} onClick={() => this.handleSongClick(item)} onMouseEnter={() => this.mouseOver(index)} onMouseLeave={() => this.mouseLeave()} >
                                <td id="song-number">{this.handleNumberChange(item, index)}</td>
                                <td key={item.title + (index + 1)}>
                                    {item.title}
                                </td>
                                <td key={item.duration + (index + 1)}>
                                    {this.formatTime(parseInt(item.duration))}
                                </td>
                            </tr>
                        )}
                        </tbody>
                </table>
                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    duration={this.formatTime(this.audioElement.duration)}
                    trueDuration={this.audioElement.duration}
                    currentTime={this.audioElement.currentTime}
                    handleTimeSeek={(e) => this.handleTimeSeek(e)}
                    formattedCurrentTime={this.formatTime(this.audioElement.currentTime)}
                    volume={this.state.volume * 100}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                />
            </section>
        );
    }
}

export default Album;