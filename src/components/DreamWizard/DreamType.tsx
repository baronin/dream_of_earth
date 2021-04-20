import React from "react";

type Props = {
  onSelect: (type: "Video" | "Text") => void;
};

const DreamType = (props: Props) => {
  const { onSelect } = props;
  return (
    <div>
      <button onClick={() => onSelect("Video")}>Video</button>
      <button onClick={() => onSelect("Text")}>Text</button>
    </div>
  );
};

export default DreamType;
