import { emailRegex, linkedRegex, phoneNumberRegex } from './index';

interface ClearErrors {
	(fieldName?: string | string[]): void;
}

interface FieldChangeHandler {
	(fieldName: string, value: string, clearErrors: ClearErrors): void;
}

export const handleNameChange: FieldChangeHandler = (fieldName, value, clearErrors) => {
	if (value.length >= 3 && value.length <= 16) {
		clearErrors(fieldName);
	}
};

export const handleSurnameChange: FieldChangeHandler = (fieldName, value, clearErrors) => {
	if (value.length >= 5 && value.length <= 16) {
		clearErrors(fieldName);
	}
};

export const onHandleStackChange: FieldChangeHandler = (fieldName, value, clearErrors) => {
	if (value.length >= 2 && value.length <= 300) clearErrors(fieldName);
};

export const onHandlePhoneChange: FieldChangeHandler = (fieldName, value, clearErrors) => {
	// console.log(phoneNumberRegex.test(value));
	if (phoneNumberRegex.test(value)) {
		clearErrors(fieldName);
	}
};

export const onHandleEmailChange: FieldChangeHandler = (fieldName, value, clearErrors) => {
	if (emailRegex.test(value)) {
		clearErrors(fieldName);
	}
};

// видаляємо рендер помилки поля 'LinkedIn'
export const onHandleLinkedChange: FieldChangeHandler = (fieldName, value, clearErrors) => {
	if (linkedRegex.test(value)) {
		clearErrors(fieldName);
	}
};
// видаляємо рендер помилки поля 'City'
export const onHandleCityChange: FieldChangeHandler = (fieldName, value, clearErrors) => {
	if (value.length >= 1 && value.length <= 22) {
		clearErrors(fieldName);
	}
};
