import { PropsWithChildren } from 'react';

import '../styles/components/Title.css';

export type TitleProps = PropsWithChildren;

export function Title({ children }: TitleProps) {
  if (!children) {
    children = '';
  }

  const content = children.toString();

  return (
    <h1 className="title-component">
      <span>
        {content.charAt(0).toUpperCase()}
      </span>

      {content.toString().slice(1)}
    </h1>
  );
}
