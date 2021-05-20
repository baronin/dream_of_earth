import React from "react";

import { EmptyPreview, LiveStreamPreview, Player, useMediaRecorder } from "../ReactMediaRecorder/useMediaRecorder";
import css from "./DreamWizard.module.css";

const DreamVideoTest = () => {
  const {
    status,
    liveStream,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    clearMediaStream,
  } = useMediaRecorder({
    mediaStreamConstraints: { audio: true, video: true },
  });

  React.useEffect(() => {
    getMediaStream();
    // clearMediaStream;
  }, []);
  return (
    <article>
      <h1>Video recorder</h1>
      <dialog open={status === "acquiring_media"}>Waiting for permissions</dialog>
      <p>Select video sourceel</p>
      <section className={css.wrap}>
        <div className={css.crop}>
          <LiveStreamPreview stream={liveStream} />
        </div>
        <Player srcBlob={mediaBlob} />
        {status}
        {status === "ready" && (
          <button
            type="button"
            onClick={async () => {
              await startRecording();
            }}
          >
            Start recording
          </button>
        )}

        <button type="button" onClick={stopRecording}>
          Stop recording
        </button>
        <button type="button" onClick={clearMediaStream}>
          clearMediaStream recording
        </button>
      </section>
    </article>
  );
};

export default DreamVideoTest;
