import React from "react";

function isObject(o: any) {
  return o && !Array.isArray(o) && Object(o) === o;
}

function validateMediaTrackConstraints(mediaType: any) {
  const supportedMediaConstraints: any = navigator.mediaDevices.getSupportedConstraints();
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

export type MediaRecorderHookOptions = {
  blobOptions: BlobPart[] | Blob;
  onStop: (blob: Blob) => void;
  onStart?: () => void;
  onError: (error: Error) => void;
  onDataAvailable?: (blob: Blob) => void;
  mediaRecorderOptions?: Record<string, unknown>;
  mediaStreamConstraints: Record<string, unknown>;
};

export function useMediaRecorder({
  blobOptions = [],
  onStop = noop,
  onStart = noop,
  onError = noop,
  onDataAvailable = noop,
  mediaRecorderOptions = {},
  mediaStreamConstraints = {},
}: MediaRecorderHookOptions) {
  const mediaChunks = React.useRef<Blob[]>([]);
  const mediaStream = React.useRef<MediaStream | null>(null);
  const mediaRecorder = React.useRef<MediaRecorder | null>(null);
  const [error, setError] = React.useState<DOMException | null>(null);
  const initialStatus = Array.isArray(blobOptions) && blobOptions.length === 0 ? "idle" : "finished";
  const [status, setStatus] = React.useState(initialStatus);
  const [mediaBlob, setMediaBlob] = React.useState<Blob | null>(null);

  function wait(delayInMS: number) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
  }
  async function getMediaStream() {
    if (error) {
      console.log("getMediaStream", error);
      setError(null);
    }
    setStatus("acquiring_media");
    try {
      // let stream: MediaStream;
      const stream: MediaStream | null = await window.navigator.mediaDevices.getUserMedia(mediaStreamConstraints);

      mediaStream.current = stream;
      setStatus("ready");
    } catch (err) {
      setError(err);
      setStatus("failed");
    } finally {
      console.log("getMediaStream status", status);
      console.log("getMediaStream error", error);
    }
  }

  async function startRecording() {
    console.log("startRecording");
    if (error) {
      setError(null);
    }

    console.log("startRecording mediaStream.current", mediaStream.current);
    mediaChunks.current = [];

    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current, mediaRecorderOptions);
      mediaRecorder.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorder.current.addEventListener("stop", handleStop);
      mediaRecorder.current.addEventListener("error", handleError);
      mediaRecorder.current.start();
      console.log(`${mediaRecorder.current.state} for  ${4000 / 1000}  seconds...`);

      setStatus(mediaRecorder.current.state); // it be "recording"
      onStart();
      console.log("mediaStream.current", mediaStream.current);
      console.log("mediaRecorder.current", mediaRecorder.current);
    } else {
      await getMediaStream();
    }
  }

  function handleDataAvailable(e: BlobEvent) {
    if (e.data.size) {
      mediaChunks.current.push(e.data);
    }
    onDataAvailable(e.data);
  }

  function handleStop() {
    console.log("function handleStop");
    const [sampleChunk] = mediaChunks.current;
    const blobPropertyBag = { type: sampleChunk.type, ...blobOptions };

    const blob = new Blob(mediaChunks.current, blobPropertyBag);
    setStatus("Stopped");
    setMediaBlob(blob);
    onStop(blob);
  }

  function handleError(e: MediaRecorderErrorEvent) {
    setError(e.error);
    setStatus("status");
    onError(e.error);
  }

  function clearMediaStream() {
    if (mediaRecorder.current) {
      mediaRecorder.current.removeEventListener("dataavailable", handleDataAvailable);
      mediaRecorder.current.addEventListener("stop", handleStop);
      mediaRecorder.current.addEventListener("error", handleError);
      mediaRecorder.current = null;
    }
    if (mediaStream.current) {
      mediaStream.current?.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
      mediaChunks.current = [];
    }
    console.log("clearMediaStream status", status);
  }

  function pauseRecording() {
    // что будет если убрать mediaStream
    if (mediaStream.current && mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.pause();
    }
  }

  function resumeRecording() {
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
    }
  }

  function stopRecording() {
    console.log("stopRecording mediaRecorder.current", mediaRecorder.current);
    if (mediaRecorder.current) {
      setStatus("stopping");
      mediaRecorder.current.stop();
      mediaRecorder.current.removeEventListener("stop", handleStop);
      mediaRecorder.current.removeEventListener("error", handleError);
      mediaRecorder.current = null;
      clearMediaStream();
    } else {
      console.error("FCK stopRecording");
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

type LiveStreamProps = {
  stream: MediaStream | null;
};

export function LiveStreamPreview({ stream }: LiveStreamProps) {
  const videoPreviewRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return (
    <video className="previewVideo" ref={videoPreviewRef} width={320} height={480} autoPlay>
      <track kind="captions" />
    </video>
  );
}

export type PlayerProps = {
  blob: Blob | null;
};

export function Player({ blob }: PlayerProps) {
  console.log("Player blob", blob);
  if (!blob) {
    return null;
  }

  return (
    <video className="player" src={URL.createObjectURL(blob)} width={320} height={480} controls>
      <track kind="captions" />
    </video>
  );
}
