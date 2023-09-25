import { Exo_2 } from 'next/font/google';

import { LayoutContainer } from '../components/LayoutContainer/LayoutContainer';
import ReduxProvider from '../redux/store/ReduxProvider';
import { ApiFetchComp } from './ApiFetchComp';
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
    <ReduxProvider>
      <html lang="en" className={eho.className}>
        <EmotionRegistry>
          <body>
            <LayoutContainer>
              {children}
              <ApiFetchComp />
            </LayoutContainer>
          </body>
        </EmotionRegistry>
      </html>
    </ReduxProvider>
  );
}
