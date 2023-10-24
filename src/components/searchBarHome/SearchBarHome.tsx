import { useAppDispatch, useAppSelector } from '../../store/store';
import { setSearchMaterial } from '../../store/features/searchSlice';

const SearchBarHome = () => {
  const { searchMaterial } = useAppSelector(
    (state) => state.searchSlice
  );
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setSearchMaterial(value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nom du matériel"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchMaterial}
      />
    </div>
  );
};

export default SearchBarHome;
