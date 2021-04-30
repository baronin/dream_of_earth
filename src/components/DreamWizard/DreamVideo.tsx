import React, { ElementRef, useRef, useState } from "react";

import css from "./DreamWizard.module.css";

const constraints1: MediaStreamConstraints = { video: { width: 1280, height: 720 } };

const DreamVideo = () => {
  const [playing, setPlaying] = useState(false);

  /* {video: {
    width: {min: 340, ideal: 1280, max: 1920},
    height: { min: 452, ideal: 720, max: 1080},
    facingMode: "user" // front camera if u use back camera  u need this condition | facingMode: { exact: "environment" }
  }}
  */

  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = async () => {
    setPlaying(true);

    const stream = await navigator.mediaDevices.getUserMedia(constraints1);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }

    /* getMedia(constraints)
      .then((mediaStream) => {
        const video = document.querySelector('.videoFeed');
        console.log(video);
        if (video) {
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        }
        console.log('getMedia test res', mediaStream);
      })
      .catch(error => {
        console.error('error name', error.name)
        console.error('error message', error.message)
      }); */
    /* navigator.getUserMedia(
      {
        video: true
      },
      (stream) => {
        let video =  document.getElementsByClassName('videoFeed')[0];
        console.log(video);
        if (video) {
          video.srcObject = stream;
          console.log('video', video);
        }
      },
        (error) => console.error(error));
    console.log('start video'); */
  };
  const stopVideo = () => {
    setPlaying(false);
    const video = document.querySelector(".videoFeed");
    if (video) {
      navigator.mediaDevices
        .getUserMedia(constraints1)
        .then(() => {
          const stream = video.srcObject;
          const tracks = stream.getTracks();

          tracks.forEach((track: { stop: () => void }) => {
            console.log("foreach");
            track.stop();
          });

          video.srcObject = null;
        })
        .catch((error) => console.log(error));
      console.log("stop video", video);
      /* const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track: { stop: () => void; }) => {
        track.stop();
      });
      video.srcObject = null; */
    }
    console.log("stop video");
  };

  const recordingTimeMS = 5000;
  /* function log(msg) {
    logElement.innerHTML += msg + "\n";
  }

  function wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
  }

  function startRecording(stream: any, lengthInMS: number) {
    const recorder = new MediaRecorder(stream);
    const data: any[] | PromiseLike<any[]> = [];

    recorder.ondataavailable = (event: { data: any }) => data.push(event.data);
    recorder.start();
    log(`${recorder.state} for ${lengthInMS / 1000} seconds...`);

    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event: { name: any }) => reject(event.name);
    });

    const recorded = wait(lengthInMS).then(() => recorder.state === "recording" && recorder.stop());

    return Promise.all([stopped, recorded]).then(() => data);
  } */
  return (
    <div>
      <div className={css.textWrapTitle}>
        <h2>Record your dream</h2>
        <p>Record your 30-second video! For example, start with “Hi, I’m Robin from Sweden and I dream of ...”</p>
      </div>
      <div className="previewVideo">
        <h2>Preview</h2>
        <h2>Recording</h2>
        <video ref={videoRef} id="recording" className="videoFeed" width="160" height="120" controls autoPlay muted />
        {playing ? (
          <button id="stopButton" type="button" className="button" onClick={stopVideo}>
            Stop
          </button>
        ) : (
          <button id="startButton" type="button" className="button" onClick={startVideo}>
            Start
          </button>
        )}

        <a id="downloadButton" className="button">
          Download
        </a>
        {/*
        <video className={css.previewVideo} id="preview" width="340" height="452" autoPlay muted />
*/}
      </div>
    </div>
  );
};

export default DreamVideo;
