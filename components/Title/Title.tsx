"use client";
/** @jsxImportSource @emotion/react */
import { titleStyle } from "./Title.styles";

interface TitleProps {
	children: string;
}

const Title = ({ children }: TitleProps) => {
	return <h2 css={titleStyle}>{children}</h2>;
};

export default Title;
