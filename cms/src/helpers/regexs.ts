/* eslint-disable no-useless-escape */
export const nameRegex = /^[A-Za-zA-Яа-яЄєІіЇїҐґ\-'\s]+[A-Za-zA-Яа-яЄєІіЇїҐґ]{1}$/s;
export const cityRegex = /^[A-Za-zA-Яа-яЄєІіЇїҐґ\-',\(\)\s]+[A-Za-zA-Яа-яЄєІіЇїҐґ\)]{1}$/s;
export const discordRegex = /^(?!(here|everyone))(?!.*(discord|```))[^\@\#\:]{2,32}(#\d{4})?$/s;
// export const discordRegex = /^(?:[A-Za-z0-9]{2,}#(?!0000)\d{4}|(?!.*..)[a-z0-9.]{2,32})$/i;
export const linkedRegex = /^https:\/\/www\.linkedin\.com\/in\/[A-Za-zA-Яа-я0-9\-.:\/]+$/s;
// export const phoneNumberRegex = /^(\+\d{1,3})?\d{9,10}$/s;
export const phoneNumberRegex = /^\+\d{10,13}$/s;
export const emailRegex =
  /^(?!.*\.\.)(?!.*\.@)(?!\..*)[a-zA-Z0-9!#$%&'\*\+\/=\?^_`\{\|\}~.\-]+@(?![\-\.].*)(?!.*\.\.)(?!.*[\-\.]$)[a-zA-Z0-9\-.]{2,}$/s;
