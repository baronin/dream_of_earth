import React, { useState } from "react";

type Props = {
  onSelect: (categories: string[]) => void;
};

const DreamCategory = (props: Props) => {
  const { onSelect } = props;
  const categories = ["No poverty", "zero hunger"];
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const onToggleCategory = (category: string) => {
    const filtered = activeCategories.filter((item) => item !== category);
    if (!activeCategories.includes(category)) filtered.push(category);
    setActiveCategories(filtered);
  };

  return (
    <div>
      {categories.map((category) => (
        <label key={category} htmlFor={category}>
          <input
            type="checkbox"
            value={category}
            id={category}
            onChange={() => onToggleCategory(category)}
          />
          <span>{category}</span>
        </label>
      ))}
      <button type="button" onClick={() => onSelect(activeCategories)}>
        Next step
      </button>
    </div>
  );
};

export default DreamCategory;
