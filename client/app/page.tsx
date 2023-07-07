<<<<<<< HEAD
import Container from 'components/Container/Container';

import WelcomePage from '~components/WelcomePage/WelcomePage';

=======
import { EndPopUp } from '~components/EndPopUp/EndPopUp';
import { StartPopUp } from '~components/StartPopUp/StartPopUp';
>>>>>>> develop

export const metadata = {
	title: 'Feeda',
	description: "Candidate's application",
};

export default function Home() {
	return (
		<main>
<<<<<<< HEAD
			
				<WelcomePage/>
			
=======
			<StartPopUp />
			<EndPopUp />
>>>>>>> develop
		</main>
	);
}
