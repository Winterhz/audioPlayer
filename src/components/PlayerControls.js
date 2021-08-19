import React, { useEffect, useRef, useState } from 'react';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight, FaPlay, FaPause} from 'react-icons/fa';
import {BsArrowCounterclockwise, BsArrowClockwise} from 'react-icons/bs';

function PlayerControls(props) {
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const progressBar = useRef();
    const animationRef = useRef();

    useEffect(() => {
        const seconds = Math.floor(props.audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
        animationRef.current = requestAnimationFrame(whilePlaying);
      }); 

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const properSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${properSeconds}`;
    }

    const playOrPause = () => {
        const prevValue = props.isPlaying;
        props.setIsPlaying(!prevValue);
        if (!prevValue) {
            props.audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
          props.audioPlayer.current.pause();
          cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = props.audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        props.audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }
    
    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

    const backFive = () => {
        progressBar.current.value = Number(progressBar.current.value - 5);
        changeRange();
    }
    
    const forwardFive = () => {
        progressBar.current.value = Number(progressBar.current.value - -5);
        changeRange();
    }

    const nextSong = ( forwards = true ) => {
        props.skipSong();
    }

    return(
        <div className="playerControls">            
        <audio src={props.songs[props.currentSongIndex].src} ref={props.audioPlayer}></audio>
            <div className="durationBarContainer">

            <div className="currentTime">{isNaN(duration)? '0:00' : calculateTime(currentTime)}</div>

            <div>
              <input type="range" className='progressBar' defaultValue='0' ref={progressBar} onChange={changeRange}/>
            </div>

            <div className="duration">{isNaN(duration)? '00:00' : calculateTime(duration)}</div>
            </div>

            <div className="controlsContrainer">
            <button className="controlsButton" onClick={() => props.skipSong(false)}><FaArrowAltCircleLeft/></button>
            <button className="controlsButton" onClick={backFive}><BsArrowCounterclockwise/></button>
            <button className="controlsButton" id='play' onClick={playOrPause}> { props.isPlaying ? <FaPause /> : <FaPlay />}</button>
            <button className="controlsButton" onClick={forwardFive}><BsArrowClockwise/></button>
            <button className="controlsButton" onClick={() => props.skipSong()}><FaArrowAltCircleRight/></button>
            </div>
        </div>
    )
}

export default PlayerControls;