/* eslint-disable no-useless-escape */
export const nameRegex = /^[A-Za-zA-Яа-яЄєІіЇїҐґ\-'\s]+[A-Za-zA-Яа-яЄєІіЇїҐґ]{1}$/s;
export const cityRegex = /^[A-Za-zA-Яа-яёЁЄєІіЇїҐґ\-',\(\)\s]+[A-Za-zA-Яа-яёЁЄєІіЇїҐґ\)]{1}$/s;
export const discordRegex = /^(?:[A-Za-z0-9_]{2,}#(?!0000)\d{4}|(?!.*\.\.)[a-z0-9_.]{2,32})$/i;
export const linkedRegex = /^(?:https:\/\/www|www)\.linkedin\.com\/in\/.*$/s;
export const phoneNumberRegex = /^\+\d{10,13}$/s;
export const emailRegex =
  /^(?!\s+)(?!.*\.\.)(?!.*\.@)(?!\..*)[a-zA-Z0-9!#$%&'\*\+\/=\?^_`\{\|\}~.\-]+@(?![\-\.].*)(?!.*\.\.)(?!.*[\-\.]$)[a-zA-Z0-9\-\.]{2,}\.{1,1}[a-zA-Z0-9\-\.]{2,}$/s;
