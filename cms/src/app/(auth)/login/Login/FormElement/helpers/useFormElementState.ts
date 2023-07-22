import { useEffect, useState } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

export const useFormElementState = (error: FieldErrors<FieldValues>, nameInput: string) => {
	const [elementState, setElementState] = useState<'error' | 'success' | 'default'>('default');

	useEffect(() => {
		if (error[nameInput] === undefined) setElementState('default');
		else if (error[nameInput]) {
			setElementState('error');
		} else if (!error[nameInput]) {
			setElementState('success');
		}
	}, [error[nameInput]]);

	return { elementState };
};
