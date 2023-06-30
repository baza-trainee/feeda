import { experience, projects, type } from "../lists";

export const getExpValue = (value) =>
  value ? experience.find((item) => item.value === value) : "";

export const getProjValue = (value) =>
  value ? projects.find((item) => item.value === value) : "";

export const getTypeValue = (value) =>
  value ? type.find((item) => item.value === value) : "";
