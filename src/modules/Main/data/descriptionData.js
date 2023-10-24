import { getImage } from '../components/service/imageService';

const windowWidth = window.innerWidth;
const isRetina = window.devicePixelRatio > 1;
const deviceType =
  windowWidth <= 767 ? 'mobile' : windowWidth <= 1439 ? 'tablet' : 'desktop';

const descrsImgs = [
  {
    image: getImage(deviceType, isRetina, 1),
  },
  {
    image: getImage(deviceType, isRetina, 2),
  },
  {
    image: getImage(deviceType, isRetina, 3),
  },
];

export default descrsImgs;
