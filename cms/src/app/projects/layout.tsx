import { Header } from '../../components/Header/Header';
import { LayoutContainer } from '../../components/LayoutContainer/LayoutContainer';

export const metadata = {
  title: 'Feeda - Projects | CMS',
  description: 'Admin panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <Header />
      {children}
    </LayoutContainer>
  );
}
