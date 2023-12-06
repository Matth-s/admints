export const putSpaceOnString = (string: string) => {
  const parts = string.match(/.{1,2}/g);

  const stringWithSpace = parts?.join(' ');

  return stringWithSpace;
};
