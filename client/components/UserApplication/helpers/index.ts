import { getExpValue, getProjValue, getTypeValue } from './getValues';
import {
	handleNameChange,
	handleSurnameChange,
	onHandleCityChange,
	onHandleEmailChange,
	onHandleLinkedChange,
	onHandlePhoneChange,
	onHandleStackChange,
} from './handleChange';
import { discordRegex, emailRegex, linkedRegex, phoneNumberFormat, phoneNumberRegex } from './regex';
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
	handleNameChange,
	handleSurnameChange,
	onHandleCityChange,
	onHandleEmailChange,
	onHandleLinkedChange,
	onHandlePhoneChange,
	onHandleStackChange,
	useCustomIds,
};
