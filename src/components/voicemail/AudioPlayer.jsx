import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const AudioPlayer = (props) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Referance
  const { soundUrl } = props;
  const audioplayer = useRef();
  const progressBar = useRef();

  // Function
  const toglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioplayer.current.play();
    } else {
      audioplayer.current.pause();
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const loadedMetadata = () => {
    console.log(audioplayer)
    // const seconds = Math.floor(audioplayer.current.duration);
    // setDuration(seconds);
    // progressBar.current.max = seconds;
  };

  const whilePlaying = () => {
    progressBar.current.value = audioplayer.current.currentTime;
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrentTime(audioplayer.current.currentTime);
  };

  const controlBar = () => {
    audioplayer.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrentTime(audioplayer.current.currentTime);
  };

  return (
    <Audioplayer>
      <audio
        src={soundUrl}
        ref={audioplayer}
        onLoadedMetadata={loadedMetadata}
        onTimeUpdate={whilePlaying}
      ></audio>

      {/* progress bar */}
      <ProgressBarWrap>
        <ProgressBar
          type="range"
          defaultValue="0"
          ref={progressBar}
          onInput={controlBar}
        />
      </ProgressBarWrap>

      {/* currenttime */}
      {/* duration */}
      <AudioTimeWrap>
        <Currenttime>{calculateTime(currentTime)}</Currenttime>
        <Duration>{calculateTime(duration)}</Duration>
      </AudioTimeWrap>

      {/* play btn */}
      <PlayPause onClick={toglePlayPause}>
        {isPlaying ? (
          <img
            src={`${process.env.PUBLIC_URL}/images/pause.png`}
            alt="아이콘"
          />
        ) : (
          <img src={`${process.env.PUBLIC_URL}/images/play.png`} alt="아이콘" />
        )}
      </PlayPause>
    </Audioplayer>
  );
};

export default AudioPlayer;

const Audioplayer = styled.div`
  width: 100%;
  position: relative;
`;

const PlayPause = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  margin: -10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AudioTimeWrap = styled.div`
  display: flex;
`;

const Currenttime = styled.div`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: #898989;
`;

const Duration = styled(Currenttime)`
  position: absolute;
  right: 0;
`;

const ProgressBarWrap = styled.div`
  margin-top: 30px;
`;

const ProgressBar = styled.input`
  --bar-bg: #d9d9d9;
  --seek-before-color: #7d7d7d;
  --seek-before-width: 0;
  --knobby: #7d7d7d;
  --selectedKnobby: #7d7d7d;

  // FOR WEBKIT BASED BROWSERS (CHROME, SAFARI, OPERA)

  background: linear-gradient(
    to right,
    var(--seek-before-color) 0%,
    var(--seek-before-color) var(--seek-before-width),
    var(--bar-bg) var(--seek-before-width),
    var(--bar-bg) 100%
  );
  border-radius: 2px;
  width: 100%;
  height: 8px;
  outline: none;
  transition: background 450ms ease-in;

  -webkit-appearance: none;

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    border: none;
    border-radius: 2px;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: var(--seek-before-color);
    margin-top: -px;
  }

  :focus {
    outline: none;
  }

  // FOR FIREFOX

  /* fix for FF unable to apply focus style bug  */
  border: 1px solid white;

  /*required for proper track sizing in FF*/
  width: 100%;

  ::-moz-range-track {
    width: 100%;
    height: 8px;
    background: var(--bar-bg);
    border: none;
    border-radius: 2px;
  }

  ::-moz-range-thumb {
    border: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: var(--seek-before-color);
  }

  /*hide the outline behind the border*/
  :-moz-focusring {
    outline: 1px solid white;
    outline-offset: -1px;
  }

  :focus::-moz-range-track {
    background: var(--bar-bg);
  }

  // FOR INTERNET EXPLORER 10 +

  ::-ms-track {
    width: 100%;
    height: 8px;

    /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
    background: transparent;

    /*leave room for the larger thumb to overflow with a transparent border */
    border-color: transparent;
    border-width: 6px 0;

    /*remove default tick marks*/
    color: transparent;
  }

  ::-ms-fill-lower {
    background: var(--seek-before-color);
    border-radius: 4px;
  }

  ::-ms-fill-upper {
    background: #ddd;
    border-radius: 4px;
  }

  ::-ms-thumb {
    border: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: var(--seek-before-color);
  }

  :focus::-ms-fill-lower {
    background: #888;
  }

  :focus::-ms-fill-upper {
    background: #ccc;
  }
`;
