declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare global {
  interface HTMLVideoElement {
    captureStream(frameRate?: number): MediaStream;
    mozCaptureStream(frameRate?: number): MediaStream;
  }
}

export {};
