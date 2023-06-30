import { emailRegex, linkedRegex, phoneNumberRegex } from "./index";

export const handleNameChange = (fieldName, value, clearErrors) => {
  if (value.length >= 3 && value.length <= 16) {
    clearErrors(fieldName);
  }
};

export const handleSurnameChange = (fieldName, value, clearErrors) => {
  if (value.length >= 5 && value.length <= 16) {
    clearErrors(fieldName);
  }
};

export const onHandleStackChange = (fieldName, value, clearErrors) => {
  if (value.length >= 2 && value.length <= 300) clearErrors(fieldName);
};

export const onHandlePhoneChange = (fieldName, value, clearErrors) => {
  // console.log(phoneNumberRegex.test(value));
  if (phoneNumberRegex.test(value)) {
    clearErrors(fieldName);
  }
};

export const onHandleEmailChange = (fieldName, value, clearErrors) => {
  if (emailRegex.test(value)) {
    clearErrors(fieldName);
  }
};

// видаляємо рендер помилки поля 'LinkedIn'
export const onHandleLinkedChange = (fieldName, value, clearErrors) => {
  if (linkedRegex.test(value)) {
    clearErrors(fieldName);
  }
};
// видаляємо рендер помилки поля 'City'
export const onHandleCityChange = (fieldName, value, clearErrors) => {
  if (value.length >= 1 && value.length <= 22) {
    clearErrors(fieldName);
  }
};
