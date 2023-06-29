import Container from "components/Container/Container";
import Styling from "components/Styling/Styling";

export const metadata = {
    title: 'Feeda',
    description: "Candidate's application",
};

export default function Home() {
    return (
        <main>
            <Container>
                <Styling />
            </Container>
        </main>
    );
}
