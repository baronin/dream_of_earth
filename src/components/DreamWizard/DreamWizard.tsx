import React, { useState } from "react";

import DreamCategory from "./DreamCategory";
import DreamType from "./DreamType";

const DreamWizard = () => {
  const [step, setStep] = useState(0);
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
      {step === 0 && <DreamType onSelect={onSelectType} />}
      {step === 1 && <DreamCategory onSelect={onSelectCategory} />}
      <button type="button" onClick={() => console.log("Ivan the best", type, categories)}>
        RIJIK
      </button>
    </div>
  );
};

export default DreamWizard;
