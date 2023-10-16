import { Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ReviewCard from './components/ReviewCard';
import ControlNext from './components/ControlNext';
import ControlPrev from './components/ControlPrev';

import css from './styles/Reviews.module.css';
import { findAll } from '../Reviews/redux/reviewsOperations';
import { selectReviews } from './redux/reviewsSelectors';

function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

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
            slideGap={{ base: 0, xl: 24 }}
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
