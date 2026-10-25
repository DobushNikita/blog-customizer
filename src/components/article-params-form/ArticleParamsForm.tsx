import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import type React from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  initialState: ArticleStateType;
  currentState: ArticleStateType;
  onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  initialState,
  currentState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formState, setFormState] = useState<ArticleStateType>(currentState);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect((): void => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
    setIsSidebarOpen(false);
  };

  const handleReset = (): void => {
    onApply(initialState);
  };

  return (
    <>
      <ArrowButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <aside
        ref={sidebarRef}
        className={clsx(styles.container, isSidebarOpen && styles.container_open)}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) =>
              setFormState({ ...formState, fontFamilyOption: option })
            }
          />

          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => setFormState({ ...formState, fontColor: option })}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) =>
              setFormState({ ...formState, backgroundColor: option })
            }
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setFormState({ ...formState, contentWidth: option })}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="clear" htmlType="reset" />
            <Button title="Применить" type="apply" htmlType="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
