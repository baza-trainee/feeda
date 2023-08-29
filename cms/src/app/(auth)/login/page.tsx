'use client';
/** @jsxImportSource @emotion/react */
import { LoginForm } from './Login/Login';
import { ContainerCss } from './styles';

export default function LoginPage() {
	return (
		<article css={ContainerCss}>
			<LoginForm />
		</article>
	);
}
