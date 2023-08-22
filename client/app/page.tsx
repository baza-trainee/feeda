'use client';
import React, { useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useGlobalState } from '~/hooks/useGlobalState';
import { EndPopUp } from '~components/EndPopUp/EndPopUp';
import { Modal } from '~components/Modal/Modal';
import { StartPopUp } from '~components/StartPopUp/StartPopUp';
import { UserApplication } from '~components/UserApplication/UserApplication';

type Screens = {
	[key: string]: React.ReactElement;
};

export default function Home() {
	const screens: Screens = {
		start: <StartPopUp />,
		application: <UserApplication />,
		finish: <EndPopUp />,
	};
	const { state, setState } = useGlobalState();

	useEffect(() => {
		setState((prev) => ({
			modal: prev.modal || 'terms',
			visible: prev.visible || false,
			approved: {
				agreement: prev.approved?.agreement || false,
				terms: prev.approved?.terms || false,
			},
			location: prev.location || 'start',
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const ScreenComponent = () => screens[state.location as keyof Screens];

	return (
		<main>
			<AnimatePresence mode="wait">
				<ScreenComponent />
			</AnimatePresence>
			<Modal isVisible={state.visible || false} />
		</main>
	);
}
