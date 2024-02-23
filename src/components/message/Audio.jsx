import React, { useState, useRef } from 'react';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(blob);
        };

        mediaRecorder.start();
        setIsRecording(true);

        setTimeout(() => {
          mediaRecorder.stop();
          setIsRecording(false);
        }, 5000); 
      })
      .catch(err => console.error('Error recording audio:', err));
  };

  const handleListen = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      <button onClick={handleListen} disabled={!audioBlob}>
        Listen
      </button>
      {audioBlob && (
        <div>
          <audio controls src={audioRef} />
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
