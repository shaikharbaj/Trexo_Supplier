export const getInitialsFromString = (str: any, characterLimit: number = 2) => {
  const initials = str.match(/\b\w/g).slice(0, characterLimit).join("");
  return initials;
};
