import Container from 'components/Container/Container';
import UserApplication from 'components/UserApplication/UserApplication';

export const metadata = {
	title: 'Feeda',
	description: "Candidate's application",
};

export default function Home() {
	return (
		<main>
			<Container>
				<UserApplication />
			</Container>
		</main>
	);
}
