import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import MaterialCard from '../../components/materialCard/MaterialCard';

import { useAppSelector } from '../../store/store';

import './style.scss';
import SearchBarHome from '../../components/searchBarHome/SearchBarHome';

type Props = {
  isLoading: boolean;
};

const Home = ({ isLoading }: Props) => {
  const navigate = useNavigate();
  const { material } = useAppSelector((state) => state.MaterialSlice);
  const { searchMaterial } = useAppSelector(
    (state) => state.searchSlice
  );

  const materialMemo = useMemo(() => {
    return material.filter((item) =>
      item.name.includes(searchMaterial)
    );
  }, [material, searchMaterial]);

  const handleAddCreateReservation = () => {
    navigate('/create-material');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  return (
    <div className="home-container">
      <Header />

      <section className="home-content">
        <SearchBarHome />

        {materialMemo.length === 0 && searchMaterial === '' ? (
          <button
            className="create-new-material-button absolute absolute__center"
            onClick={() => handleAddCreateReservation()}
          >
            Créer une annonce
          </button>
        ) : (
          <>
            {searchMaterial !== '' && (
              <h2>
                {materialMemo.length} résultat
                {materialMemo.length > 1 ? 's' : ''} pour "
                {searchMaterial}"
              </h2>
            )}
            <h2>{}</h2>
            {materialMemo.map((item) => (
              <MaterialCard key={item.id} material={item} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
