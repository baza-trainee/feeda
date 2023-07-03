'use client';
/** @jsxImportSource @emotion/react */
import { titleStyle } from './Title.styles';

interface TitleProps {
	children: string;
}

const Title = ({ children }: TitleProps) => {
	return <h1 css={titleStyle}>{children}</h1>;
};

export default Title;
