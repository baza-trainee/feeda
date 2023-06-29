import Container from "components/Container/Container";
import Styling from "components/Styling/Styling";
import WelcomePage from "components/WelcomePage/WelcomePage";

export const metadata = {
    title: 'Feeda',
    description: "Candidate's application",
};

export default function Home() {
    return (
        <main>
            <Container>
                <WelcomePage />
            </Container>
        </main>
    );
}
