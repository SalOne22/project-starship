import { Container, Title, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconX } from '@tabler/icons-react';

import ReviewCard from './components/ReviewCard';
import ControlNext from '@/assets/icons/sliderNextBtn.svg?react';
import ControlPrev from '@/assets/icons/sliderPrevBtn.svg?react';

import css from './styles/Reviews.module.css';
import { findAll } from '../Reviews/redux/reviewsOperations';
import { selectReviews } from './redux/reviewsSelectors';

function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const { t } = useTranslation();
  const autoplay = useRef(Autoplay({ delay: 4000, playOnInit: true }));

  useEffect(() => {
    try {
      dispatch(findAll());
    } catch (error) {
      notifications.show({
        color: 'red',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        title: t('common.reviews'),
        message: t('reviews.notification.fetchError'),
      });
    }
  }, [dispatch, t]);

  return (
    <>
      {reviews.length > 0 && (
        <Container
          pt={{ base: 32, xl: 50 }}
          pb={{ base: 32, md: 100, xl: 118 }}
        >
          <Title c="blue.4" className={css.title}>
            {t('common.reviews')}
          </Title>
          <Carousel
            slideSize={{ base: '100%', xl: '50%' }}
            slideGap={{ base: 8, xl: 24 }}
            slidesToScroll={{ base: 1, xl: 2 }}
            loop
            align="start"
            nextControlIcon={<ControlNext />}
            previousControlIcon={<ControlPrev />}
            classNames={{
              controls: css.controls,
              control: css.control,
            }}
            w={{ base: '100%', xl: 1184 }}
            mx={'auto'}
            dragFree
            draggable={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {reviews.map((review) => (
              <Carousel.Slide key={review._id}>
                <ReviewCard review={review} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      )}
    </>
  );
}

export default Reviews;
