import React from "react";

type Props = {
  onClose: (type: boolean) => boolean;
  onBack: () => void;
  step: number;
};

const DreamSteps: React.FC<Props> = ({ onClose, step }) => {
  return (
    <div>
      test
    </div>
  );
};

export default DreamSteps;
