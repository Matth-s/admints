export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Extraction des composants de la date
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
