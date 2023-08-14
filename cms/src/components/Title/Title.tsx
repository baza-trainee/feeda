'use client';
/** @jsxImportSource @emotion/react */
import { MainTitle, SecondaryTitle } from './Title.styles';

type TitleProps = {
  title: string;
  main?: boolean;
};

export const Title = ({ title, main }: TitleProps) => {
  return main ? <MainTitle>{title}</MainTitle> : <SecondaryTitle>{title}</SecondaryTitle>;
};
