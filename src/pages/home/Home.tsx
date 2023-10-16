import CreateNewMaterialButton from '../../components/buttons/createNewMaterial/CreateNewMaterialButton';
import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import MaterialCard from '../../components/materialCard/MaterialCard';

import { useAppSelector } from '../../store/store';

import './style.scss';

type Props = {
  isLoading: boolean;
};

const Home = ({ isLoading }: Props) => {
  const { material } = useAppSelector((state) => state.MaterialSlice);
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
        {material.length === 0 ? (
          <CreateNewMaterialButton />
        ) : (
          material.map((item) => (
            <MaterialCard key={item.id} material={item} />
          ))
        )}
      </section>
    </div>
  );
};

export default Home;
