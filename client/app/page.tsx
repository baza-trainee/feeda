import Container from 'components/Container/Container';
import Styling from 'components/Styling/Styling';

import { GoodbyePage } from '~components/GoodbyePage/GoodbyePage';

export const metadata = {
	title: 'Feeda',
	description: "Candidate's application",
};

export default function Home() {
	return (
		<main>
			<Container>
				{/* <Styling /> */}
				<GoodbyePage />
			</Container>
		</main>
	);
}
