import { useState } from 'react';

interface IDiscord {
	(fieldName: string, value: string): void;
}

export const useDiscordValidation = (
	discordRegex: RegExp,
	clearErrors: (fieldName: string) => void
): [boolean, IDiscord, (event: { target: { value: string } }) => void] => {
	const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

	const onHandleDiscordChange: IDiscord = (fieldName, value) => {
		if (discordRegex.test(value)) {
			clearErrors(fieldName);
			setShouldDisplayMessage(true);
		} else {
			setShouldDisplayMessage(false);
		}
	};

	const onBlurDiscord = (event: { target: { value: string } }) => {
		const value = event.target.value;
		if (value && discordRegex.test(value)) {
			setShouldDisplayMessage(true);
		} else {
			setShouldDisplayMessage(false);
		}
	};

	return [shouldDisplayMessage, onHandleDiscordChange, onBlurDiscord];
};
