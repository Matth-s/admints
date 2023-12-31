import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  setSearchBooking,
  setSearchChoice,
} from '../../store/features/searchSlice';

import './style.scss';

const SearchBarBooking = () => {
  const dispatch = useAppDispatch();
  const { searchChoice, searchBooking } = useAppSelector(
    (state) => state.searchSlice
  );

  const handleChangeSearch = (value: string) => {
    dispatch(setSearchBooking(value.toLocaleLowerCase().trim()));
  };

  const handleChangeSelect = (value: string) => {
    dispatch(setSearchChoice(value));
  };

  return (
    <div className="search-bar-booking-container flex flex__alignCenter">
      <h2>Filtrer par: </h2>
      <select
        onChange={(e) => handleChangeSelect(e.target.value)}
        defaultValue={searchChoice}
      >
        <option value="">Aucun</option>
        <option value="materialName">Nom du matériel</option>
        <option value="firstName">Prénom</option>
        <option value="lastName">Nom</option>
        <option value="paid">Payé</option>
        <option value="notPaid">Non payé</option>
        <option value="hightToLow">Trier par total croissant</option>
        <option value="lowToHight">
          Trier par total décroissant
        </option>
      </select>

      <input
        type="text"
        onChange={(e) => handleChangeSearch(e.target.value)}
        defaultValue={searchBooking}
        placeholder="Recherche"
      />
    </div>
  );
};

export default SearchBarBooking;
