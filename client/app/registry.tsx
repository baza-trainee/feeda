'use client';

import React, { useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

import { globalStyles } from '../styles/globalStyles';

export default function EmotionRegistry({ children }: { children: JSX.Element }) {
	const [cache] = useState(() => {
		const cache = createCache({ key: 'css' });
		cache.compat = true;
		return cache;
	});

	useServerInsertedHTML(() => {
		return (
			<style
				data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
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
