import React, { ElementRef, useRef, useState } from "react";

import css from "./DreamWizard.module.css";

const constraints: MediaStreamConstraints = { video: { width: 1280, height: 720 } };

function wait(delayInMS: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

function startRecording(stream: MediaStream, lengthInMS: number) {
  const recorder = new MediaRecorder(stream);
  const data: Blob[] = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  console.log(`${recorder.state} for  ${lengthInMS / 1000}  seconds...`);

  const stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.error.name);
  });

  const recorded = wait(lengthInMS).then(() => recorder.state === "recording" && recorder.stop());

  return Promise.all([stopped, recorded]).then(() => data);
}

function stop(stream: MediaStream) {
  stream.getTracks().forEach((track) => track.stop());
}

const DreamVideo = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const startVideo = async () => {
    setPlaying(true);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          downloadRef.current.href = stream;
          videoRef.current.captureStream = videoRef.current.captureStream || videoRef.current.mozCaptureStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }

        return new Promise((resolve) => videoRef.current.onplaying = resolve);
      })
      .then(() => {
        console.log("then2");
        startRecording(videoRef.current.captureStream(), 5000).then((recordedChunks: BlobPart[]) => {
          console.log("then3", recordedChunks);
          const recordedBlob: Blob = new Blob(recordedChunks, { type: "video/webm" });
          videoRef.current.src = URL.createObjectURL(recordedBlob);
          downloadRef.current.href = videoRef.current.src;
          downloadRef.current.download = "RecordedVideo.webm";
          console.log(`Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
        });
      })
      .catch((e) => console.error("THIS IS ERROR", e));
  };

  const stopVideo = async () => {
    setPlaying(false);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    if (videoRef.current) {
      stop(videoRef.current.srcObject);
      // videoRef.current.srcObject = stream;
      console.log("stop video", videoRef);
    }
  };

  return (
    <div>
      <div className={css.textWrapTitle}>
        <h2>Record your dream</h2>
        <p>Record your 30-second video! For example, start with “Hi, I’m Robin from Sweden and I dream of ...”</p>
      </div>
      <div className="previewVideo">
        <h2>Preview</h2>
        <h2>Recording</h2>
        <video ref={videoRef} className="videoFeed" width="320" height="160" controls autoPlay muted />
        {playing ? (
          <button type="button" className={css.recordVideo} onClick={stopVideo}>
            Stop
          </button>
        ) : (
          <button type="button" className={css.recordVideo} onClick={startVideo}>
            Start
          </button>
        )}

        <a className={css.downloadVideo} ref={downloadRef}>
          Download
        </a>
      </div>
    </div>
  );
};

export default DreamVideo;
