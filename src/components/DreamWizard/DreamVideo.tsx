import React, { FC } from "react";

import { LiveStreamPreview, Player, useMediaRecorder } from "../ReactMediaRecorder/useMediaRecorder";
import css from "./DreamWizard.module.css";

type mediaStreamConstraints = { mediaStreamConstraints: { audio: boolean; video: { width: number; height: number } } };

type Props = {
  onSelect: (newText: string) => void;
};

const DreamVideo: FC<Props> = ({ onSelect }) => {
  const config: mediaStreamConstraints = {
    mediaStreamConstraints: { audio: true, video: { width: 320, height: 480 } },
  };
  const {
    status,
    nextStep,
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
      <h3>
        <button type="button" className={css.recordVideo} onClick={clearMediaStream}>
          Stop camera
        </button>
      </h3>
      {status === "acquiring_media" ? (
        <dialog open={status === "acquiring_media"}>Waiting for permissions</dialog>
      ) : (
        <div>
          <h2>{status}</h2>
          <hr />
          <h2>{nextStep}</h2>
          <p>Record your 30-second video! For example, start with “Hi, I’m Robin from Sweden and I dream of ...”</p>
        </div>
      )}

      {status !== "idle" && (
        <section className={css.wrap}>
          {status === "stopped" ? null : <LiveStreamPreview stream={liveStream} />}
          {status === "recording" ? null : <Player srcBlob={mediaBlob} />}
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

          {status === "recording" && (
            <button type="button" onClick={stopRecording} className={`${css.recordVideo} ${css.endRecord}`}>
              <span />
              End recording
            </button>
          )}
          {status === "Stopped" && (
            <div style={{ display: "flex", flex: "1 1 0" }}>
              <button
                type="button"
                className={`${css.recordVideo} ${css.startRecord}`}
                onClick={async () => {
                  await startRecording();
                }}
              >
                Record again
              </button>
              <button type="button" className={css.recordVideo} onClick={() => onSelect(nextStep)}>
                Next step
              </button>
            </div>
          )}
          <label htmlFor="upload" className={css.uploadVideo}>
            <input id="upload" type="file" placeholder="Can’t record? Upload video instead" />
            Can’t record? Upload video instead
          </label>
        </section>
      )}
    </article>
  );
};

export default DreamVideo;
