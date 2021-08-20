import { ReactElement } from "react";

export type ReactMediaRecorderRenderProps = {
  error: string;
  muteAudio: () => void;
  unMuteAudio: () => void;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  mediaBlobUrl: string | null;
  status: StatusMessages;
  isAudioMuted: boolean;
  previewStream: MediaStream | null;
  clearBlobUrl: () => void;
};

export type ReactMediaRecorderHookProps = {
  audio?: boolean | MediaTrackConstraints;
  video?: boolean | MediaTrackConstraints;
  screen?: boolean;
  onStop?: (blobUrl: string, blob: Blob) => void;
  blobPropertyBag?: BlobPropertyBag;
  mediaRecorderOptions?: MediaRecorderOptions | null;
};
export type ReactMediaRecorderProps = ReactMediaRecorderHookProps & {
  render: (props: ReactMediaRecorderRenderProps) => ReactElement;
};

export type StatusMessages =
  | "media_aborted"
  | "permission_denied"
  | "no_specified_media_found"
  | "media_in_use"
  | "invalid_media_constraints"
  | "no_constraints"
  | "recorder_error"
  | "idle"
  | "acquiring_media"
  | "delayed_start"
  | "recording"
  | "stopping"
  | "stopped";

export enum RecorderErrors {
  AbortError = "media_aborted",
  NotAllowedError = "permission_denied",
  NotFoundError = "no_specified_media_found",
  NotReadableError = "media_in_use",
  OverconstrainedError = "invalid_media_constraints",
  TypeError = "no_constraints",
  NONE = "",
  NO_RECORDER = "recorder_error",
}
