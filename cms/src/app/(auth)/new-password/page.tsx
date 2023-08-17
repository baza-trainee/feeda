'use client';
/** @jsxImportSource @emotion/react */
import { ContainerCss } from '../login/styles';
import { NewPassForm } from './NewPass';

export default function NewPasswordPage() {
	return (
		<article css={ContainerCss}>
			<NewPassForm />
		</article>
	);
}
