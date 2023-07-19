'use client';
import React from 'react';

import { Wrapper } from './Container.styles';

interface ContainerTypes {
	children: JSX.Element;
}

export default function Container({ children }: ContainerTypes) {
<<<<<<< HEAD
  return <Wrapper>{children}</Wrapper>;
=======
	return <Wrapper>{children}</Wrapper>;
>>>>>>> develop
}
