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
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const downloadRef = useRef<HTMLAnchorElement>({} as HTMLAnchorElement);

  const startVideo = async () => {
    setPlaying(true);

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
    downloadRef.current.href = stream.toString();
    videoRef.current.onloadedmetadata = () => {
      videoRef.current?.play();
    };

    await new Promise((resolve) => {
      if (!videoRef.current) return;
      videoRef.current.onplaying = resolve;
    });
    const recordedChunks = await startRecording(stream, 5000).catch((e) => console.error("THIS IS ERROR", e));

    if (!recordedChunks) return;
    const recordedBlob: Blob = new Blob(recordedChunks, { type: "video/webm" });
    videoRef.current.src = URL.createObjectURL(recordedBlob);
    downloadRef.current.href = videoRef.current.src;
    downloadRef.current.download = "RecordedVideo.webm";
    console.log(`Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
  };

  const stopVideo = async () => {
    setPlaying(false);
    stop(videoRef.current.srcObject as MediaStream);
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
