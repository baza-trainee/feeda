import { useId } from 'react';

export const useCustomIds = () => {
	const experienceId = useId();
	const typeId = useId();
	const projectId = useId();

	return [experienceId, typeId, projectId];
};
