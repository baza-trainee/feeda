// import { EndPopUp } from '~components/EndPopUp/EndPopUp';
import { StartPopUp } from '~components/StartPopUp/StartPopUp';

export const metadata = {
	title: 'Feeda',
	description: "Candidate's application",
};

export default function Home() {
	return (
		<main>
			<StartPopUp />
			{/* <EndPopUp /> */}
		</main>
	);
}
