import React, { useState } from "react";

import { DreamCategory as DreamCategoryType } from "../../../@types/dreamCategory";
import { categories as dreamCategories } from "../../mock/dream-categories";
import css from "./DreamWizard.module.css";

type Props = {
  defaultCategories: DreamCategoryType[];
  onSelect: (categories: DreamCategoryType[]) => void;
};

const DreamCategory: React.FC<Props> = ({ defaultCategories, onSelect }) => {
  const [activeCategories, setActiveCategories] = useState<DreamCategoryType[]>(defaultCategories);

  const isActive = (category: DreamCategoryType) => {
    const has = activeCategories.find((active) => active.id === category.id);
    return Boolean(has);
  };

  const onToggleCategory = (category: DreamCategoryType) => {
    const filtered = activeCategories.filter((item) => item.id !== category.id);
    const isThere = isActive(category);
    if (!isThere) filtered.push(category);
    setActiveCategories(filtered);
  };

  return (
    <div>
      <div className={css.categoriesDesc}>
        <h3>What is your dream about?</h3>
        <p>Deploy offline this discussion for product launch the right info at the right time to the.</p>
        <h4>SELECT YOUR 1-5 CATEGORIES</h4>
      </div>
      <div className={css.categoriesList}>
        {dreamCategories.map((category) => (
          <label key={`categories${category.id}`} htmlFor={category.id} style={{ backgroundColor: category.color }}>
            <input
              type="checkbox"
              checked={isActive(category)}
              value={category.id}
              id={category.id}
              onChange={() => onToggleCategory(category)}
            />
            <span>{category.name}</span>
          </label>
        ))}
      </div>
      <button
        className={css.btnNextStep}
        type="button"
        onClick={() => onSelect(activeCategories)}
        disabled={activeCategories.length < 1 || activeCategories.length >= 6}
      >
        Next step
      </button>
    </div>
  );
};

export default DreamCategory;
