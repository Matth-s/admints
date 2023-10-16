import { providedMaterials } from '../../schema/material-schema';

import './style.scss';

type Props = {
  provided: providedMaterials[];
};

const ProvidedMaterial = ({ provided }: Props) => {
  return (
    <div className="provided-material">
      <h2>
        Materiel{provided.length > 1 && 's'} pouvant être founis :
      </h2>

      <ul>
        {provided.length > 0 ? (
          provided.map((item) => (
            <li key={item.id}>
              {item.materialName} : {item.price}€
            </li>
          ))
        ) : (
          <p>Aucun</p>
        )}
      </ul>
    </div>
  );
};

export default ProvidedMaterial;
