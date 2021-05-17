import { MediaType } from "express";
import React from "react";

function isObject(o) {
  return o && !Array.isArray(o) && Object(o) === o;
}

function validateMediaTrackConstraints(mediaType: MediaType) {
  const supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints();
  const unSupportedMediaConstraints = Object.keys(mediaType).filter(
    (constraint) => !supportedMediaConstraints[constraint],
  );

  if (unSupportedMediaConstraints.length !== 0) {
    const toText = unSupportedMediaConstraints.join(",");
    console.error(`The following constraints ${toText} are not supported on this browser.`);
  }
}

// don't know how it fix
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useMediaRecorder({
  blobOptions,
  onStop = noop,
  onStart = noop,
  onError = noop,
  onDataAvailable = noop,
  mediaRecorderOptions,
  mediaStreamConstraints = {},
}) {
  const mediaChunks = React.useRef([]);
  const mediaStream = React.useRef(null);
  const mediaRecorder = React.useRef(null);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("status");
  const [mediaBlob, setMediaBlob] = React.useState(null);

  async function getMediaStream() {
    if (error) {
      setError(null);
    }
    setStatus("get_media_stream");
    try {
      let stream: MediaStream;
      stream = await window.navigator.mediaDevices.getUserMedia(mediaStreamConstraints);

      mediaStream.current = stream;
      setStatus("ready");
    } catch (err) {
      setError(err);
      setStatus("failed");
    }
  }

  async function startRecording() {
    console.log("startRecording");
    if (error) {
      setError(null);
    }

    if (!mediaStream.current) {
      await getMediaStream();
    }

    mediaChunks.current = [];
    console.log("mediaStream.current", mediaStream.current);

    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current, mediaRecorderOptions);
      mediaRecorder.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorder.current.addEventListener("stop", handleStop);
      mediaRecorder.current.addEventListener("error", handleError);
      mediaRecorder.current.start();
      setStatus("recording");
      onStart();
      console.log("mediaStream.current", mediaStream.current);
    }
  }

  function handleDataAvailable(e) {
    if (e.data.size) {
      mediaChunks.current.push(e.data);
    }
    onDataAvailable(e.data);
  }

  function handleStop() {
    const [sampleChunk] = mediaChunks.current;
    const blobPropertyBag = { type: sampleChunk.type, ...blobOptions };

    const blob = new Blob(mediaChunks.current, blobPropertyBag);
    setStatus("Stopped");
    setMediaBlob(blob);
    onStop(blob);
  }

  function handleError(e) {
    setError(e.error);
    setStatus("status");
    onError(e.error);
  }

  function clearMediaStream() {
    if (mediaRecorder.current) {
      mediaRecorder.current.removeEventListener("dataavailable", handleDataAvailable);
      mediaRecorder.current.addEventListener("stop", handleStop);
      mediaRecorder.current.addEventListener("error", handleError);
      mediaRecorder.current.start();
      setStatus("recording");
      onStart();
    }
  }

  function pauseRecording() {
    if (mediaStream.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.pause();
    }
  }

  function resumeRecording() {
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
    }
  }

  function stopRecording() {
    if (mediaRecorder.current) {
      setStatus("stopping");
      mediaRecorder.current.stop();
      mediaRecorder.current.removeEventListener("stop", handleStop);
      mediaRecorder.current.removeEventListener("error", handleError);
      mediaRecorder.current = null;
      clearMediaStream();
    }
  }

  React.useEffect(() => {
    if (!window.MediaRecorder) {
      throw new ReferenceError(
        "MediaRecorder is not supported in this browser. Please ensure that you are running the latest version of chrome/firefox/edge.",
      );
    }

    if (isObject(mediaStreamConstraints.video)) {
      validateMediaTrackConstraints(mediaStreamConstraints.video);
    }

    if (isObject(mediaStreamConstraints.audio)) {
      validateMediaTrackConstraints(mediaStreamConstraints.audio);
    }

    if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
      if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
        console.error(`The specified MIME type supplied to MediaRecorder is not supported by this browser.`);
      }
    }
  }, [mediaStreamConstraints, mediaRecorderOptions]);

  return {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    pauseRecording,
    resumeRecording,
    clearMediaStream,
    get liveStream() {
      if (mediaStream.current) {
        return new MediaStream(mediaStream.current.getVideoTracks());
      }
      return null;
    },
  };
}

export function LiveStreamPreview({ stream }) {
  const videoPreviewRef = React.useRef();

  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return <video ref={videoPreviewRef} width={320} height={480} autoPlay />;
}

export function Player({ srcBlob }) {
  if (!srcBlob) {
    return null;
  }

  return <video src={URL.createObjectURL(srcBlob)} width={320} height={480} controls />;
}
