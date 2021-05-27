import React, { FC, useState } from "react";

import css from "./DreamWizard.module.css";

type Props = {
  onSelect: (newText: string) => void;
};

const DreamText: FC<Props> = ({ onSelect }) => {
  const [textArea, setTextArea] = useState("");
  console.log(textArea);
  return (
    <div>
      <div className={css.textWrapTitle}>
        <h2>Write your dream</h2>
        <p>Write your 140 character dream! For example, start with “I dream of ...”</p>
      </div>

      <div className={css.textAreaWrap}>
        <textarea
          className={css.textArea}
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          name=""
          id=""
          cols={30}
          rows={10}
          maxLength={140}
          placeholder="Write your dream here..."
        >
          {textArea}
        </textarea>
        <button
          className={css.btnNextStep}
          type="button"
          onClick={() => onSelect(textArea)}
          disabled={textArea.length < 1 || textArea.length >= 141}
        >
          Next step
        </button>
      </div>
    </div>
  );
};

export default DreamText;
