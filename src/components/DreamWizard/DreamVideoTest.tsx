import React from "react";

import { LiveStreamPreview, Player, useMediaRecorder } from "../ReactMediaRecorder/useMediaRecorder";

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
    mediaStreamConstraints: { audio: true, video: true }
  });

  React.useEffect(() => clearMediaStream, []);
  return (
    <article>
      <h1>Video recorder</h1>
      <dialog open={status === "get_media_stream"}>Waiting for permissions</dialog>
      <p>Select video sourceel</p>
      <section>
        {status !== "recording" && (
          <button
            type="button"
            onClick={async () => {
              console.log("start recording");
              await getMediaStream();
              await startRecording();
            }}
          >
            Start recording
          </button>
        )}
        {status === "recording" && (
          <button type="button" onClick={stopRecording}>
            Stop recording
          </button>
        )}
      </section>
      <LiveStreamPreview stream={liveStream} />
      <Player srcBlob={mediaBlob} />
    </article>
  );
};

export default DreamVideoTest;
