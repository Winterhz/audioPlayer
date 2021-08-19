import React from 'react';

function PlayerDetails(props) {
    return(
        <div className="playerDetails">
            <div className="songCoverImage">
                <img src={props.song.img_src} alt=""/>
            </div>
            <h3 className="songTitle">{props.song.title}</h3>
            <h4 className="songArtist">{props.song.artist}</h4>
        </div>
    )
}

export default PlayerDetails;