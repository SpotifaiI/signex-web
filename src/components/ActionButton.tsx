import { PropsWithChildren } from 'react';

import '../styles/components/ActionButton.css';

export type ActionButtonProps = {
  onChange: () => void
} & PropsWithChildren;

export function ActionButton({
  onChange, children
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className="action-button-component"
      onClick={onChange}>
      {children}
    </button>
  );
}
