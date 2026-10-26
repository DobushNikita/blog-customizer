import { useState } from 'react';

import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';
import {
  defaultArticleState,
  type ArticleStateType,
} from './../../constants/articleProps';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleState, setArticleState] =
    useState<ArticleStateType>(defaultArticleState);

  const handleApply = (newState: ArticleStateType): void => {
    setArticleState(newState);
  };

  const cssVariables: CSSProperties = {
    '--font-family': articleState.fontFamilyOption.value,
    '--font-color': articleState.fontColor.value,
    '--bg-color': articleState.backgroundColor.value,
    '--container-width': articleState.contentWidth.value,
    '--font-size': articleState.fontSizeOption.value,
  } as React.CSSProperties;

  return (
    <main className={styles.main} style={cssVariables}>
      <ArticleParamsForm
        onReset={() => setArticleState(defaultArticleState)}
        onApply={handleApply}
      />
      <Article />
    </main>
  );
};
