'use client';

import React, { useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

import { globalStyles } from '../styles/globalStyles';

<<<<<<< HEAD
export default function EmotionRegistry({
	children,
}: {
    children: JSX.Element;
}) {
=======
export default function EmotionRegistry({ children }: { children: JSX.Element }) {
>>>>>>> develop
	const [cache] = useState(() => {
		const cache = createCache({ key: 'css' });
		cache.compat = true;
		return cache;
	});

	useServerInsertedHTML(() => {
		return (
			<style
<<<<<<< HEAD
				data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(
					' '
				)}`}
=======
				data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
>>>>>>> develop
				dangerouslySetInnerHTML={{
					__html: Object.values(cache.inserted).join(' '),
				}}
			/>
		);
	});

	return (
		<>
			<Global styles={globalStyles} />
			<CacheProvider value={cache}>{children}</CacheProvider>
		</>
	);
}
