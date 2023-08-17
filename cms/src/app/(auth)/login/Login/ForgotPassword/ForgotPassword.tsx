/** @jsxImportSource @emotion/react */
import Link from 'next/link';

import { ContainerCss, LinkCss } from './ForgotPassword.styles';

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
