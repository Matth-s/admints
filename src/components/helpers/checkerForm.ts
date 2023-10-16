import { providedMaterials } from '../../schema/material-schema';

const requiredFiled = 'Ce champ est requis';

export const checkIfIsEmpty = (value: string) => {
  if (value.length === 0) {
    return requiredFiled;
  }
};

export const checkProvidedMaterial = (
  providedMaterial: providedMaterials[]
) => {
  if (providedMaterial.length === 0) {
    return;
  }

  const itemsWithEmptyMaterialName = providedMaterial.filter(
    (item) => item.materialName.length === 0
  );

  return itemsWithEmptyMaterialName.map((item) => ({
    requiredField: 'Le nom du materiel ne peut être vide',
    id: item.id,
  }));
};
