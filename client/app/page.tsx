import Container from 'components/Container/Container';

import WelcomePage from '~components/WelcomePage/WelcomePage';


export const metadata = {
	title: 'Feeda',
	description: "Candidate's application",
};

export default function Home() {
	return (
		<main>
			
				<WelcomePage/>
			
		</main>
	);
}
