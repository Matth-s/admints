export interface Material {
  id: string;
  name: string;
  downPayment: number;
  unavailableDates: string[] | [];
  providedMaterials: providedMaterials[] | [];
  presentationPicture: string;
  arrayPicture: arrayPicture[] | [];
  description: string;
  visible: boolean;
  pricePerDay: number;
  coachingPriceHour: number;
}

export interface arrayPicture {
  id: string;
  src: string;
}

export interface providedMaterials {
  id: string;
  materialName: string;
  price: number;
}
