'use client';
/** @jsxImportSource @emotion/react */
import { MainTitle, SecondaryTitle } from './Title.styles';

type TitleProps = {
  title: string;
  main?: boolean;
  small?: boolean;
};

export const Title = ({ title, main, small = false }: TitleProps) => {
  return main ? <MainTitle>{title}</MainTitle> : <SecondaryTitle small={small}>{title}</SecondaryTitle>;
};
