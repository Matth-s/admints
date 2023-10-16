import './style.scss';

type Props = {
  openCalendar: () => void;
};

const ViewCalendarButton = ({ openCalendar }: Props) => {
  const handleViewCalendar = () => {
    openCalendar();
  };

  return (
    <button
      className="view-calendar"
      onClick={() => handleViewCalendar()}
    >
      Afficher le calendrier
    </button>
  );
};

export default ViewCalendarButton;
