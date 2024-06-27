import { PropsWithChildren } from 'react';

import '../styles/components/ActionButton.css';

export type ActionButtonProps = {
  onClick: () => void
} & PropsWithChildren;

export function ActionButton({
  onClick, children
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className="action-button-component"
      onClick={onClick}>
      {children}
    </button>
  );
}
