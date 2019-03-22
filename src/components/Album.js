import React, { Component } from 'react';
import albumData from './../data/albums'

class Album extends Component{
    constructor(props){
        super(props);
        const album = albumData.find( xy => {
            return xy.slug === this.props.match.params.slug
        });
        this.state = {
            album: album
        }
    }
    render(){
        return(
            <section className="album">
                <section id="album-info">
                    <img src={this.state.album.albumCover} alt={this.state.album.title} />
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
                <table id="song-list" >
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    {this.state.album.songs.map( (item, index) =>
                        <tbody>
                            <tr key={index}>
                                <td key={'song' + (index + 1)}>
                                    {index+1}
                                </td>
                                <td key={item.title + (index + 1)}>
                                    {item.title}
                                </td>
                                <td key={item.duration + (index + 1)}>
                                    {item.duration}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </section>
        );
    }
}

export default Album;