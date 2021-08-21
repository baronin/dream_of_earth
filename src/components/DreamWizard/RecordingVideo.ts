const waitMetaData = (video: HTMLVideoElement) => {
  return new Promise((resolve) => {
    video.onloadedmetadata = resolve;
  });
};

function wait(delayInMS: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

const record = (stream: MediaStream, lengthInMS: number) => {
  const recorder = new MediaRecorder(stream);
  const data: Blob[] = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  console.log(`${recorder.state} for  ${lengthInMS / 1000}  seconds...`);

  const stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.error.name);
  });

  const recorded = wait(lengthInMS).then(() => recorder.state === "recording" && recorder.stop());

  return Promise.all([stopped, recorded])
    .then(() => data)
    .finally(() => {
      stream.getTracks().forEach((track) => track.stop());
    });
};

const start = async (stream: MediaStream, video: HTMLVideoElement) => {
  await waitMetaData(video);
  await video.play();

  const recordedChunks = await record(stream, 15000);

  const recordedBlob: Blob = new Blob(recordedChunks, { type: "video/webm" });
  video.srcObject = null;
  video.src = URL.createObjectURL(recordedBlob);

  console.log(`Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
};

export default start;
