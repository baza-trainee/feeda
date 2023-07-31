/** @jsxImportSource @emotion/react */
import Image from 'next/image';

import checkmark from '../../../../../public/checkmark.svg';
import cross from '../../../../../public/cross.svg';
import { btn, btnAccept, btnCancel } from './ControlBtn.styles';

type ControlBtnProps = {
  text?: string;
  color?: string;
  style?: React.CSSProperties;
  type: 'accept' | 'cancel' | 'other';
  isDisabled?: boolean;
  callback: () => void;
};

export function ControlBtn({ text, type, color, isDisabled, style, callback }: ControlBtnProps) {
  return type === 'accept' ? (
    <button css={[btn, btnAccept]} style={style} type="button" disabled={isDisabled} onClick={callback}>
      <Image style={{ marginRight: '8px' }} src={checkmark} width={16} alt="Так" />
      Так
    </button>
  ) : type === 'cancel' ? (
    <button css={[btn, btnCancel]} style={style} type="button" disabled={isDisabled} onClick={callback}>
      <Image style={{ marginRight: '8px' }} src={cross} width={16} alt="Скасувати" />
      Скасувати
    </button>
  ) : (
    <button css={[btn]} style={style} type="button" color={color} disabled={isDisabled} onClick={callback}>
      {text}
    </button>
  );
}
