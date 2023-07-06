import { Suspense } from 'react';

import { EndPopUp } from '~components/EndPopUp/EndPopUp';
import { StartPopUp } from '~components/StartPopUp/StartPopUp';

import Loading from './loading';

export const metadata = {
	title: 'Feeda',
	description: "Candidate's application",
};

export default function Home() {
	return (
		<main>
			<Suspense fallback={<Loading />}>
				<StartPopUp />
				{/* <EndPopUp /> */}
			</Suspense>
		</main>
	);
}
