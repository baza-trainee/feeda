import EmotionRegistry from './registry';
import './globals.css';

export default function RootLayout({ children }: { children: JSX.Element }) {
    return (
        <EmotionRegistry>
            <html lang="en">
                <body>{children}</body>
            </html>
        </EmotionRegistry>
    );
}
