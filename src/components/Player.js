import React, {useEffect, useState, useRef} from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';

function Player(props) {

    const [isPlaying, setIsPlaying] = useState(false);

    const audioPlayer = useRef();

    useEffect(() => {
        if (isPlaying) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
    });
    
    const skipSong = ( forwards = true ) => { //true = next song, false = prev song
        if(forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if(temp > props.songs.length - 1) {
                    temp = 0;
                }
                return temp;
            })
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if(temp < 0) {
                    temp = props.songs.length - 1;
                }
                return temp;
            })
        }
        console.log(props.currentSongIndex);
    }

    return(
        <div className="player">
            
            <h3>Now Playing</h3>
            <PlayerDetails song={props.songs[props.nextSongIndex]} />
            <PlayerControls 
                currentSongIndex={props.currentSongIndex}
                skipSong={skipSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioPlayer={audioPlayer}
                songs={props.songs}
            />
            <p><b>Next song:</b> {props.songs[props.currentSongIndex].title} by {props.songs[props.currentSongIndex].artist}</p>
        </div>
    )
}

export default Player;