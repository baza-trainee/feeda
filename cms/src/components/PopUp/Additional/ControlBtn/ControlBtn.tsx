/** @jsxImportSource @emotion/react */

import { IconSprite } from '../../../IconSprite/IconSprite';
import { btn, btnAccept, btnCancel } from './ControlBtn.styles';

type ControlBtnProps = {
  text?: string;
  color?: string;
  style?: React.CSSProperties;
  type: 'accept' | 'cancel' | 'other';
  isDisabled?: boolean;
  callback?: () => void;
};

export function ControlBtn({ text, type, color, isDisabled, style, callback }: ControlBtnProps) {
  return type === 'accept' ? (
    <button css={[btn, btnAccept]} style={style} type="button" disabled={isDisabled} onClick={callback}>
      <IconSprite icon="checkmark" />
      Так
    </button>
  ) : type === 'cancel' ? (
    <button css={[btn, btnCancel]} style={style} type="button" disabled={isDisabled} onClick={callback}>
      <IconSprite icon="cross" />
      Скасувати
    </button>
  ) : (
    <button css={[btn]} style={style} type="button" color={color} disabled={isDisabled} onClick={callback}>
      {text}
    </button>
  );
}
