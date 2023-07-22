'use client';
/** @jsxImportSource @emotion/react */
import { ContainerCss } from '../login/styles';
import { RecoverForm } from './(recover-pass)/RecoverPass';

export default function RecoverPasswordPage() {
	return (
		<article css={ContainerCss}>
			<RecoverForm />
		</article>
	);
}
