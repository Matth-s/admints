import { Carousel } from 'react-responsive-carousel';
import { arrayPicture } from '../../schema/material-schema';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './style.scss';

type Props = {
  arrayPicture: arrayPicture[] | [];
  presentationPicture: string;
};

const MaterialCarousel = ({ arrayPicture }: Props) => {
  return (
    <Carousel>
      {arrayPicture.map((item, index) => (
        <div key={index}>
          <img src={item.src} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default MaterialCarousel;
