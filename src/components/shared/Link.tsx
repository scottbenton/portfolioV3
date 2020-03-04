import React, { FunctionComponent } from "react";
import { ButtonProps, Button } from "./Button";

interface LinkProps extends ButtonProps {
  href: string;
  isEditing: boolean;
  onChange: (href: string) => void;
}

export const Link: FunctionComponent<LinkProps> = props => {
  const { href, isEditing, onChange, children, ...buttonProps } = props;

  if (isEditing) {
    return (
      <input
        value={href}
        onChange={evt => onChange(evt.target.value)}
        size={href ? href.length : 5}
      />
    );
  } else {
    return (
      <>
        {href && (
          <Button link={href} {...buttonProps}>
            {children}
          </Button>
        )}
      </>
    );
  }
};
