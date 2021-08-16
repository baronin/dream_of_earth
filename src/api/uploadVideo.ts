// const ACCESS_TOKEN = "45392dc057322eff77f2ea349edb606f"; bloodyave+v1@gmail.com

const ACCESS_TOKEN = "47eb604b883b7693c7a80131f18d4d10"; // yaroslav.baronin@outlook.com
const VIMEO_API_URL = "https://api.vimeo.com/me/videos";

const createVideo = async (video: Blob | null = null) => {
  try {
    const response = await fetch(VIMEO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
      body: JSON.stringify({
        upload: {
          approach: "tus",
          size: video?.size.toString(),
        },
        name: `Dream #`,
      }),
    });
    console.log("postData response", response);
    const body = await response.json();
    return body.upload.upload_link;
  } catch (error) {
    console.log("Error post data for vimeo", error);
    throw error;
  }
};

const uploadVideo = async (video: Blob | null, uploadLink: string) => {
  try {
    const res = await fetch(uploadLink, {
      method: "PATCH",
      headers: {
        "Tus-Resumable": "1.0.0",
        "Upload-Offset": "0",
        "Content-Type": "application/offset+octet-stream",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
      body: video,
    });
    console.log("uploadVideo", res);
  } catch (error) {
    console.log("Error post data for vimeo", error);
    throw error;
  }
};

const verifyUpload = async (uploadLink: string) => {
  try {
    const res = await fetch(uploadLink, {
      method: "HEAD",
      headers: {
        "Tus-Resumable": "1.0.0",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
    });
    console.log("progress body", res);
  } catch (error) {
    console.log("Error progress vimeo", error);
    throw error;
  }
};

const uploadedVideo = async (video: Blob | null) => {
  const linkVideo = await createVideo(video);
  await uploadVideo(video, linkVideo);
  await verifyUpload(linkVideo);
  return linkVideo;
};

export const videosUserHasUploaded = async () => {
  try {
    const response = await fetch("https://api.vimeo.com/me/videos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${ACCESS_TOKEN}`,
        Accept: " application/vnd.vimeo.user+json;version=3.0,application/vnd.vimeo.video+json;version=3.4",
      },
    });
    return await response.json();
  } catch (err) {
    throw Error(`Response error${err.message}`);
  }
};

export default uploadedVideo;
