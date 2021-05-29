import React, { FC, useState } from "react";

import {
  LiveStreamPreview,
  MediaRecorderHookOptions,
  Player,
  PlayerProps,
  useMediaRecorder,
} from "../ReactMediaRecorder/useMediaRecorder";
import css from "./DreamWizard.module.css";

type mediaStreamConstraints = { mediaStreamConstraints: { audio: boolean; video: { width: number; height: number } } };

type Props = {
  onSelect: (newVideo: Blob | null) => void;
  video: Blob | null;
  onSaveVideo: () => void;
};

const DreamVideo: FC<Props> = ({ onSelect, video, onSaveVideo }) => {
  const config: MediaRecorderHookOptions = {
    mediaStreamConstraints: { audio: true, video: { width: 320, height: 480 } },
    blobOptions: video || [],
    onStop: onSelect,
    onError: () => console.log("onError"),
  };

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
    console.log(status);
    if (video) return;
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
          <p>Record your 30-second video! For example, start with “Hi, I’m Robin from Sweden and I dream of ...”</p>
        </div>
      )}

      <section className={css.wrap}>
        {liveStream && !video && <LiveStreamPreview stream={liveStream} />}
        {video && <Player blob={video} />}
        {status === "ready" && (
          <button type="button" className={`${css.recordVideo} ${css.startRecord}`} onClick={startRecording}>
            <span />
            Start recording
          </button>
        )}

        {status === "recording" && (
          <button
            type="button"
            onClick={stopRecording}
            className={`${css.recordVideo} ${css.endRecord}`}
          >
            <span />
            End recording
          </button>
        )}
        {(status === "Stopped" || status === "finished") && (
          <div style={{ display: "flex", flex: "1 1 0" }}>
            <button
              type="button"
              className={`${css.recordVideo} ${css.startRecord}`}
              onClick={async () => {
                onSelect(null);
                await startRecording();
              }}
            >
              Record again
            </button>
            <button type="button" className={css.recordVideo} onClick={onSaveVideo}>
              Next step
            </button>
          </div>
        )}
        <label htmlFor="upload" className={css.uploadVideo}>
          <input id="upload" type="file" placeholder="Can’t record? Upload video instead" />
          Can’t record? Upload video instead
        </label>
      </section>
    </article>
  );
};

export default DreamVideo;
