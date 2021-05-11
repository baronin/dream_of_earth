import React, { useRef, useState } from "react";

import css from "./DreamWizard.module.css";
import start from "./RecordingVideo";

const constraints: MediaStreamConstraints = { video: { width: 340, height: 450 }, audio: true };

const DreamVideo = () => {
  const [playing, setPlaying] = useState(false);
  const [download, setDownload] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const startVideo = async () => {
    setPlaying(true);
    if (!videoRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoRef.current.srcObject = stream;
    await start(stream, videoRef.current);

    setPlaying(false);

    if (downloadRef.current) {
      downloadRef.current.href = videoRef.current.src;
      downloadRef.current.download = "RecordedVideo.webm";
      setDownload(true);
    }
  };

  return (
    <div>
      <div className={css.textWrapTitle}>
        <h2>Record your dream</h2>
        <p>Record your 30-second video! For example, start with “Hi, I’m Robin from Sweden and I dream of ...”</p>
      </div>
      <div className={css.previewVideo}>
        <video ref={videoRef} className={css.videoFeed} width="340" height="450" controls autoPlay muted />
        {playing ? (
          <button type="button" className={`${css.recordVideo} ${css.endRecord}`}>
            <span />
            End recording
          </button>
        ) : (
          <button type="button" className={`${css.recordVideo} ${css.startRecord}`} onClick={startVideo}>
            <span />
            Start recording
          </button>
        )}
        <a className={`${css.downloadVideo} ${download ? css.downloadVideoShow : ""}`}>Download</a>
      </div>
    </div>
  );
};

export default DreamVideo;
