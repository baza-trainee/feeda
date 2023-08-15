/* eslint-disable no-useless-escape */
export const nameRegex = /^[A-Za-zA-Яа-яЄєІіЇїҐґ\-'\s]+$/;
export const phoneNumberRegex = /^\+\d{12}$/;
export const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
// export const emailRegex = /\b[\w.-]+@[\w.-]+.\w{2,4}\b/;
export const discordRegex = /^(?:[A-Za-z]+#(\d)|[a-z0-9_.]*[a-z][a-z0-9_.]*)$/i;
export const linkedRegex = /^https:\/\/www\.linkedin\.com\/in\/[A-Za-zA-Яа-я0-9\-.:\/]+$/;
export const cityRegex = /^[A-Za-zA-Яа-яЄєІіЇїҐґ\-',()\s]+$/;
