import { providedMaterialsBooking } from '../../schema/booking-schema';

import './styles.scss';

type Props = {
  material: providedMaterialsBooking[] | [];
};

export default function ProvidedMaterialBooking({ material }: Props) {
  return (
    <>
      {material.length > 0 ? (
        <table className="material-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {material.map((item) => (
              <tr key={item.id}>
                <td>{item.materialName}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun matériel</p>
      )}
    </>
  );
}
