'use client';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import Loading from '~/src/app/loading';

import { persistor, store } from './store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
