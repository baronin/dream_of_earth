import React, { useState } from "react";

import css from "./DreamWizard.module.css";

type Props = {
  onSelect: (categories: string[]) => void;
};

const DreamCategory = (props: Props) => {
  const { onSelect } = props;
  const categories = ["No poverty", "zero hunger", "test", "test", "test", "test"];
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const onToggleCategory = (category: string) => {
    const filtered = activeCategories.filter((item) => item !== category);
    if (!activeCategories.includes(category)) filtered.push(category);
    setActiveCategories(filtered);
  };

  return (
    <div>
      <form action="">
        <label htmlFor="" className={css.label}>
          <button type="button" />
          <input className={css.inputNameDream} type="text" placeholder="Step 2 / 4" readOnly />
          <button className={css.btnClose} type="button" />
        </label>
      </form>
      <div className={css.categoriesDesc}>
        <h3>What is your dream about?</h3>
        <p>
          Deploy offline this discussion for product launch the right info at the right time to the.
        </p>
        <h4>SELECT YOUR 1-5 CATEGORIES</h4>
      </div>
      <div className={css.categoriesList}>
        {categories.map((category) => (
          <label key={category} htmlFor={category}>
            <input type="checkbox" value={category} id={category} onChange={() => onToggleCategory(category)} />
            <span>{category}</span>
          </label>
        ))}
      </div>
      <button type="button" onClick={() => onSelect(activeCategories)}>
        Next step
      </button>
    </div>
  );
};

export default DreamCategory;
