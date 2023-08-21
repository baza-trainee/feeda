/* eslint-disable no-useless-escape */
export const nameRegex = /^[-'A-Za-zА-Яа-яЄєІіЇїҐґЁё ]{2,20}$/;

export const phoneNumberRegex = /^\+\d{9,12}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const discordRegex = /^(?:[A-Za-z0-9_]{2,}#(?!0000)\d{4}|(?!.*\.\.)[a-z0-9_.]{2,32})$/i;

export const linkedRegex = /^(?:https?:\/\/(?:www\.)?linkedin\.com\/in\/)?[A-Za-zА-Яа-я0-9\-.:\/]+$/;

export const cityRegex = /^[A-Za-zА-Яа-яЄєІіЇїҐґ\-',()\s]+$/;
