import { Exo_2 } from 'next/font/google';

import EmotionRegistry from './registry';

import './globals.css';

const eho = Exo_2({
<<<<<<< HEAD
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <EmotionRegistry>
      <html
        lang='en'
        className={eho.className}
      >
        <body>{children}</body>
      </html>
    </EmotionRegistry>
  );
=======
	weight: ['400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
});

export default function RootLayout({ children }: { children: JSX.Element }) {
	return (
		<EmotionRegistry>
			<html lang="uk" className={eho.className}>
				<body>{children}</body>
			</html>
		</EmotionRegistry>
	);
>>>>>>> develop
}
