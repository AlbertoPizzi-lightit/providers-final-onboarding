export const uppercaseFirstLetter = (word: string) => {
  return !word ? "" : word.charAt(0).toUpperCase() + word.slice(1);
};
