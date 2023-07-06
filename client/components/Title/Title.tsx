'use client';
/** @jsxImportSource @emotion/react */
import { Heading } from './Title.styles';

interface TitleProps {
	children: string;
	secondary?: boolean;
}

export function Title({ children, secondary }: TitleProps) {
	return <Heading secondary={secondary}>{children}</Heading>;
}
