import { PropsWithChildren } from 'react';

import '../styles/components/ActionButton.css';

export type ActionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
} & PropsWithChildren;

export function ActionButton({
  onClick, children, disabled
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className="action-button-component"
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
}
