import './App.css';
import React, {useEffect, useState} from 'react';
import Player from './components/Player';

function App() {
  const [songs] = useState([
    { 
      title: "Giants And Companions",
      artist: "Some cool artist",
      img_src: "./images/song-1.jpg",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "Rat In The River",
      artist: "Nice guy",
      img_src: "./images/song-2.jpg",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "Ashamed Of Light",
      artist: "Karl Marx",
      img_src: "./images/song-3.jpg",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      title: "Doubting The Forest",
      artist: "Unknown artist",
      img_src: "./images/song-4.jpg",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex+1);

  useEffect(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        setNextSongIndex(0);
      } else {
        setNextSongIndex(currentSongIndex + 1);
      }
  }, [currentSongIndex]);

  return (
    <div className="App">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div>
  );
}

export default App;
