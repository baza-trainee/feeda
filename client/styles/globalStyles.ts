'use client';
import { css } from '@emotion/react';

<<<<<<< HEAD
import { animations } from './animations';
=======
>>>>>>> develop
import { reset } from './reset';
import { theme } from './theme';

const common = css`
	html,
	body {
		font-style: normal;
	}
`;

export const globalStyles = css`
<<<<<<< HEAD
	${animations}
	${common}
    ${reset}
=======
	${common}
	${reset}
>>>>>>> develop
`;
