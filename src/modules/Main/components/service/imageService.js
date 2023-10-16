import desktopImage1 from '../../images/desktop/image1.jpg';
import desktopImage1Retina from '../../images/desktop/image1@2x.jpg';
import desktopImage2 from '../../images/desktop/image2.jpg';
import desktopImage2Retina from '../../images/desktop/image2@2x.jpg';
import desktopImage3 from '../../images/desktop/image3.jpg';
import desktopImage3Retina from '../../images/desktop/image3@2x.jpg';
import tabletImage1 from '../../images/tablet/image1.jpg';
import tabletImage1Retina from '../../images/tablet/image1@2x.jpg';
import tabletImage2 from '../../images/tablet/image2.jpg';
import tabletImage2Retina from '../../images/tablet/image2@2x.jpg';
import tabletImage3 from '../../images/tablet/image3.jpg';
import tabletImage3Retina from '../../images/tablet/image3@2x.jpg';
import image1 from '../../images/mobile/image1.jpg';
import image1Retina from '../../images/mobile/image1@2x.jpg';
import image2 from '../../images/mobile/image2.jpg';
import image2Retina from '../../images/mobile/image2@2x.jpg';
import image3 from '../../images/mobile/image3.jpg';
import image3Retina from '../../images/mobile/image3@2x.jpg';

export function getImage(deviceType, isRetina, index) {
  if (deviceType === 'tablet') {
    if (isRetina) {
      switch (index) {
        case 1:
          return tabletImage1Retina;
        case 2:
          return tabletImage2Retina;
        case 3:
          return tabletImage3Retina;
        default:
          return '';
      }
    } else {
      switch (index) {
        case 1:
          return tabletImage1;
        case 2:
          return tabletImage2;
        case 3:
          return tabletImage3;
        default:
          return '';
      }
    }
  } else if (deviceType === 'desktop') {
    if (isRetina) {
      switch (index) {
        case 1:
          return desktopImage1Retina;
        case 2:
          return desktopImage2Retina;
        case 3:
          return desktopImage3Retina;
        default:
          return '';
      }
    } else {
      switch (index) {
        case 1:
          return desktopImage1;
        case 2:
          return desktopImage2;
        case 3:
          return desktopImage3;
        default:
          return '';
      }
    }
  } else {
    if (isRetina) {
      switch (index) {
        case 1:
          return image1Retina;
        case 2:
          return image2Retina;
        case 3:
          return image3Retina;
        default:
          return '';
      }
    } else {
      switch (index) {
        case 1:
          return image1;
        case 2:
          return image2;
        case 3:
          return image3;
        default:
          return '';
      }
    }
  }
}
