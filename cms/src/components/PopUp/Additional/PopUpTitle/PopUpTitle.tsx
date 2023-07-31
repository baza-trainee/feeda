import { Txt } from './PopUpTitle.styles';

type PopUpTitleProps = {
  children: React.ReactNode;
  color?: string;
};

export function PopUpTitle({ children, color }: PopUpTitleProps) {
  return <Txt color={color}>{children}</Txt>;
}
