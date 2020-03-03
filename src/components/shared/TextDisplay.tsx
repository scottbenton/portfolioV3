import React, {FunctionComponent} from 'react';
import { combineClasses } from 'utils/theme-utils';

type TextDisplayProps = {
  value: string,
  onChange: (value: string) => void,
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
  isEditing: boolean,
  className?: string,
  ignoreDefaultStyles?:boolean
}

export const TextDisplay: FunctionComponent<TextDisplayProps> = props => {
  const {component, value, isEditing, onChange, className, ignoreDefaultStyles} = props;

  const Component = component || 'span';

  const classes = combineClasses([className, ignoreDefaultStyles ? '' : component]);

  if(isEditing) {
    return <input className={classes} value={value || ''} size={value? value.length : 5} onChange={evt => onChange(evt.target.value)} />
  }
  else {
  return <Component className={classes}>{value}</Component>;
  }
}

TextDisplay.defaultProps = {
  component: 'span'
}