'use client';
import { useEffect } from 'react';

import { useGlobalState } from '~/hooks/useGlobalState';
import { EndPopUp } from '~components/EndPopUp/EndPopUp';
import Modal from '~components/Modal/Modal';
import { StartPopUp } from '~components/StartPopUp/StartPopUp';
import { UserApplication } from '~components/UserApplication/UserApplication';

export default function Home() {
	const { state, setState } = useGlobalState();

	useEffect(() => {
		const data = {
			...state,
			modal: '',
			approved: {
				terms: false,
				agreement: false,
			},
			visible: false,
			location: state.location ? state.location : 'start',
		};

		setState((prev) => ({ ...prev, ...data }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main>
			{state.location === 'start' && <StartPopUp />}
			{state.location === 'application' && <UserApplication />}
			{state.location === 'finish' && <EndPopUp />}
			<Modal />
		</main>
	);
}
