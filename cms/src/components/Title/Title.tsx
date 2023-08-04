'use client';
/** @jsxImportSource @emotion/react */
import { MainTitle, SecondaryTitle } from './Title.styles';

type TitleProps = {
  children: string;
  main?: boolean;
};

export const Title = ({ children, main }: TitleProps) => {
  return main ? <MainTitle>{children}</MainTitle> : <SecondaryTitle>{children}</SecondaryTitle>;
};
