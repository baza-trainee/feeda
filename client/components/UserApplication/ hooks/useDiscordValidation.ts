// import { useState } from 'react';

// interface IDiscord {
// 	(fieldName: string, value: string): void;
// }

// // export const useDiscordValidation = (
// // 	discordRegex: RegExp,
// // 	clearErrors: (fieldName: string) => void
// // ): [boolean, IDiscord, (fieldName: string, event: { target: { value: string } }) => void] => {
// // 	const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

// // 	const onHandleDiscordChange: IDiscord = (fieldName, value) => {
// // 		if (discordRegex.test(value)) {
// // 			clearErrors(fieldName);
// // 			setShouldDisplayMessage(true);
// // 		} else {
// // 			setShouldDisplayMessage(false);
// // 		}
// // 	};

// // 	const onBlurDiscord = (fieldName: string, event: { target: { value: string } }) => {
// // 		const value = event.target.value;
// // 		console.log('fieldName', fieldName);
// // 		console.log('value', value);
// // 		if (value && discordRegex.test(value)) {
// // 			setShouldDisplayMessage(true);
// // 		} else {
// // 			setShouldDisplayMessage(false);
// // 		}
// // 	};

// // 	return [shouldDisplayMessage, onHandleDiscordChange, onBlurDiscord];
// // };

// export const useDiscordValidation = (
// 	discordRegex: RegExp,
// 	clearErrors: (fieldName: string) => void
// ): [boolean, IDiscord, (fieldName: string, value: string) => void] => {
// 	const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

// 	const onHandleDiscordChange: IDiscord = (fieldName, value) => {
// if (discordRegex.test(value)) {
// 			clearErrors(fieldName);
// 			setShouldDisplayMessage(true);
// 		} else {
// 			setShouldDisplayMessage(false);
// 		}
// 	};

// 	const onBlurDiscord = (fieldName: string, value: string) => {
// 		console.log('fieldName', fieldName);
// 		if (value && discordRegex.test(value)) {
// 			setShouldDisplayMessage(true);
// 		} else {
// 			setShouldDisplayMessage(false);
// 		}
// 	};

// 	return [shouldDisplayMessage, onHandleDiscordChange, onBlurDiscord];
// };
