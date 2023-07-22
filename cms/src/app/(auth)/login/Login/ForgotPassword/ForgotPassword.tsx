/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import { LinkCss, ContainerCss } from './ForgotPassword.styles';

export function ForgotPassword() {
	return (
		<div css={ContainerCss}>
			<p>
				Забули пароль?{' '}
				<Link href={'/recover-password'} css={LinkCss}>
					Відновити
				</Link>
			</p>
		</div>
	);
}
