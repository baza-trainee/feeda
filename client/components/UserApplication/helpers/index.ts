import { getExpValue, getProjValue, getTypeValue } from './getValues';
import {
	cityPlaceholder,
	emailPlaceholder,
	experiencePlaceholder,
	lastnamePlaceholder,
	linkedInPlaceholder,
	namePlaceholder,
	phoneNumberFormat,
	projectPlaceholder,
	stackPlaceholder,
	typePlaceholder,
} from './placeholders';
import { cityRegex, discordRegex, emailRegex, linkedRegex, nameRegex, phoneNumberRegex } from './regex';
import { requiredField } from './requiredField';
import { useCustomIds } from './selectsId';
export {
	phoneNumberRegex,
	phoneNumberFormat,
	emailRegex,
	discordRegex,
	linkedRegex,
	getExpValue,
	getProjValue,
	getTypeValue,
	requiredField,
	useCustomIds,
	nameRegex,
	emailPlaceholder,
	linkedInPlaceholder,
	cityRegex,
	experiencePlaceholder,
	namePlaceholder,
	lastnamePlaceholder,
	stackPlaceholder,
	typePlaceholder,
	projectPlaceholder,
	cityPlaceholder,
};
