import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import styled from 'styled-components';
import { useEffect } from 'react';

const VoiceRecorder = (props) => {
  const [isRecording, setIsRecording] = useState(false);

  // Referance
  const { setBlobUrl } = props;
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
    },
  );

  useEffect(() => {
    setBlobUrl(mediaBlobUrl);
  }, [mediaBlobUrl]);

  // Function
  const togleStartStop = () => {
    const prevValue = isRecording;
    if (!prevValue) {
      startRecording();
      setIsRecording(!prevValue);
    } else {
      stopRecording();
      setIsRecording(!prevValue);
    }
  };

  return (
    <>
      <WaveWrap>
        {!isRecording ? (
          <img src={`${process.env.PUBLIC_URL}/images/wave_false.png`} style={{ width: '100%', height: '52px'}}></img>
        ) : (
          <img src={`${process.env.PUBLIC_URL}/images/wave_true.gif`}></img>
        )}
      </WaveWrap>
      <RecordBtn type="button" onClick={togleStartStop}>
        {!isRecording ? (
          <img src={`${process.env.PUBLIC_URL}/images/record.png`}></img>
        ) : (
          <>
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '-1px -6px',
                background: '#3EC192',
              }}
            ></div>
            <img
              src={`${process.env.PUBLIC_URL}/images/record_white.png`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            ></img>
          </>
        )}
      </RecordBtn>
    </>
  );
};

export default VoiceRecorder;

const WaveWrap = styled.div`
  overflow: hidden;
  height: 80px;
  display: flex;
  align-items: center;
`;

const RecordBtn = styled.button`
  width: 80px;
  height: 80px;
  border: 2px solid #3ec192;
  border-radius: 50%;
  margin: auto;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
`;
