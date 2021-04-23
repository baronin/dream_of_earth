import React, { useState } from "react";

import DreamCategory from "./DreamCategory";
import DreamMessage from "./DreamMessage";
import css from "./DreamWizard.module.css";

const DreamWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<"Text" | "Video">("Text");
  const [categories, setCategories] = useState<string[]>([]);
  const onSelectType = (newType: "Text" | "Video") => {
    setType(newType);
    setStep(step + 1);
  };
  const onSelectCategory = (newCategories: string[]) => {
    setCategories(newCategories);
    setStep(step + 1);
  };

  return (
    <div>
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
      {step === 1 && <DreamMessage onSelect={onSelectType} />}
      {step === 2 && <DreamCategory onSelect={onSelectCategory} />}
    </div>
  );
};

export default DreamWizard;
