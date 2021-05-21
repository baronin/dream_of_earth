import React from "react";

import { EmptyPreview, LiveStreamPreview, Player, useMediaRecorder } from "../ReactMediaRecorder/useMediaRecorder";
import css from "./DreamWizard.module.css";

const DreamVideoTest = () => {
  const config = { mediaStreamConstraints: { audio: true, video: { width: 320, height: 480 } } };
  const {
    status,
    liveStream,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    clearMediaStream,
  } = useMediaRecorder(config);

  React.useEffect(() => {
    getMediaStream();
  }, []);
  return (
    <article className={css.textWrapTitle}>
      <h2>Record your dream</h2>
      <h2>{status}</h2>
      <dialog open={status === "acquiring_media"}>Waiting for permissions</dialog>
      <p>Record your 30-second video! For example, start with “Hi, I’m Robin from Sweden and I dream of ...”</p>
      {status !== "idle" && (
        <section className={css.wrap}>
          {status === "stopped" ? null : <LiveStreamPreview stream={liveStream} />}
          <Player srcBlob={mediaBlob} />
          {status === "ready" && (
            <button
              type="button"
              className={`${css.recordVideo} ${css.startRecord}`}
              onClick={async () => {
                await startRecording();
              }}
            >
              <span />
              Start recording
            </button>
          )}

          <button type="button" onClick={stopRecording} className={`${css.recordVideo} ${css.endRecord}`}>
            <span />
            End recording
          </button>
          <button type="button" className={css.recordVideo} onClick={clearMediaStream}>
            clearMediaStream recording
          </button>
          <label htmlFor="upload" className={css.uploadVideo}>
            <input id="upload" type="file" placeholder="Can’t record? Upload video instead" />
            Can’t record? Upload video instead
          </label>
        </section>
      )}
    </article>
  );
};

export default DreamVideoTest;
