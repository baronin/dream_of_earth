import React, { useState } from "react";

import { DreamCategory as DreamCategoryType } from "../../../@types/dreamCategory";
import DreamApproval from "./DreamApproval";
import DreamCategory from "./DreamCategory";
import DreamForm from "./DreamForm/DreamForm";
import DreamSelect from "./DreamSelect";
import DreamText from "./DreamText";
import DreamVideo from "./DreamVideo";
import css from "./DreamWizard.module.css";

type Props = {
  closeModal: () => void;
};

const DreamWizard: React.FC<Props> = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<"Text" | "Video">("Text");
  const [categories, setCategories] = useState<DreamCategoryType[]>([]);
  const [textDream, setTextDream] = useState<string>("");
  const [videoDream, setVideoDream] = useState<Blob | null>(null);

  const onSelectType = (newType: "Text" | "Video") => {
    setType(newType);
    setStep(step + 1);
  };
  const onSelectCategory = (newCategories: DreamCategoryType[]) => {
    setCategories(newCategories);
    setStep(step + 1);
  };
  const onSetTextDream = (newText: string) => {
    setTextDream(newText);
    setStep(step + 1);
  };
  const onSetVideoDream = (newVideo: Blob | null) => {
    setVideoDream(newVideo);
  };
  const onSaveVideo = () => {
    setStep(step + 1);
  };

  const onApproval = () => {
    setStep(step + 1);
  };

  const resetForm = () => {
    setStep(1);
    setCategories([]);
    setTextDream("");
    setVideoDream(null);
    closeModal();
  };

  return (
    <article>
      <div className={css.step}>
        {step >= 2 && (
          <button type="button" className={css.stepBtnBack} onClick={() => setStep(step - 1)}>
            <svg width="10" height="20" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1L2 11L12 21" stroke="#727272" strokeWidth="2" />
            </svg>
          </button>
        )}
        <p>Step {step}</p>
      </div>
      {step === 1 && <DreamSelect onSelect={onSelectType} />}
      {step === 2 && <DreamCategory onSelect={onSelectCategory} defaultCategories={categories} />}
      {step === 3 && type === "Text" && <DreamText onSelect={onSetTextDream} />}
      {step === 3 && type === "Video" && (
        <DreamVideo onSelect={onSetVideoDream} video={videoDream} onSaveVideo={onSaveVideo} />
      )}
      {step === 4 && (
        <DreamForm
          dreamContent={videoDream || textDream}
          videoDream={videoDream}
          categories={categories}
          onApproval={onApproval}
        />
      )}
      {step === 5 && <DreamApproval resetForm={resetForm} />}
    </article>
  );
};

export default DreamWizard;
