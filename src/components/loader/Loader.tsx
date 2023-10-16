import './style.scss';

const Loader = () => {
  return (
    <div className="absolute absolute__center lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
