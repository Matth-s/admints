import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMaterialByIdService } from '../../services/material-service';

import Header from '../../components/header/Header';
import MaterialNotFound from '../../components/materialNotFound/MaterialNotFound';
import Loader from '../../components/loader/Loader';
import ActionBar from '../../components/actionsBar/ActionBar';
import Carousel from '../../components/carousel/Carousel';
import MaterialForm from '../../components/forms/material/MaterialForm';
import MaterialInformation from '../../components/materialInformation/MaterialInformation';
import ProvidedMaterial from '../../components/providedMaterial/ProvidedMaterial';
import ViewCalendarButton from '../../components/buttons/viewCalendar/ViewCalendarButton';
import CalendarModal from '../../components/modals/calendarModal/CalendarModal';
import DeleteModal from '../../components/modals/deleteModal/DeleteModal';

import './style.scss';

const ViewMaterialPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //modal
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { viewMaterial } = useAppSelector(
    (state) => state.MaterialSlice
  );

  const getMaterial = async (id: string) => {
    await dispatch(getMaterialByIdService({ id }))
      .unwrap()
      .then()
      .catch((error: any) => {
        if (error.message.includes(404)) {
          setNotFound(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!viewMaterial) {
      setIsLoading(true);
      getMaterial(id as string);
    }
  }, []);

  if (notFound) {
    return (
      <>
        <Header />
        <MaterialNotFound id={id as string} />
      </>
    );
  }

  return (
    <div className="view-material-container">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        viewMaterial && (
          <section>
            <ActionBar
              setIsEditing={setIsEditing}
              setOpenDelete={setOpenDelete}
              material={viewMaterial}
            />

            {isEditing ? (
              <MaterialForm
                material={viewMaterial}
                isEditing={true}
                setIsEditing={setIsEditing}
              />
            ) : (
              <>
                <Carousel />

                <div className="information-div flex">
                  <MaterialInformation material={viewMaterial} />
                  <ProvidedMaterial
                    provided={viewMaterial.providedMaterials}
                  />
                </div>

                <ViewCalendarButton
                  openCalendar={() => setOpenCalendar(true)}
                />

                {openCalendar &&
                  createPortal(
                    <CalendarModal
                      closeModal={() => setOpenCalendar(false)}
                      disabledDates={viewMaterial.unavailableDates}
                    />,
                    document.body
                  )}

                {openDelete &&
                  createPortal(
                    <DeleteModal
                      closeModal={() => setOpenDelete(false)}
                      id={viewMaterial.id}
                      name={viewMaterial.name}
                    />,
                    document.body
                  )}
              </>
            )}
          </section>
        )
      )}
    </div>
  );
};

export default ViewMaterialPage;
