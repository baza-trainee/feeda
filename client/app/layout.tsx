import { Exo_2 } from 'next/font/google';

import { GlobalStateProvider } from '~/hooks/useGlobalState';

import EmotionRegistry from './registry';

import './globals.css';

const eho = Exo_2({
	weight: ['400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
});

export const metadata = {
	title: 'Feeda',
	description: "Candidate's application",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
	return (
		<GlobalStateProvider>
			<EmotionRegistry>
				<html lang="uk" className={eho.className}>
					<body>{children}</body>
				</html>
			</EmotionRegistry>
		</GlobalStateProvider>
	);
}
