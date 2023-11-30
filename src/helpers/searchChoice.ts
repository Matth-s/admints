export const formatSearchChoice = (choice: string) => {
  switch (choice) {
    case 'paid':
      return 'payé';
    case 'notPaid':
      return 'non payé';
    case 'lowToHight':
      return 'Total le plus élévé au moins élévé';
  }
};
