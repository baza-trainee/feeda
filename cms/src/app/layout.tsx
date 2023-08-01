import { Exo_2 } from 'next/font/google';

import EmotionRegistry from './registry';

const eho = Exo_2({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata = {
  title: 'Feeda | CMS',
  description: 'Admin panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={eho.className}>
      <EmotionRegistry>
        <body>{children}</body>
      </EmotionRegistry>
    </html>
  );
}
