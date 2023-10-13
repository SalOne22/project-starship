import theme from '@/theme';
import { Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

import ReviewCard from './ReviewCard';
import ControlNext from './ControlNext';
import ControlPrev from './ControlPrev';

import css from '../styles/Reviews.module.css';
import { reviews } from '../mock/reviews';

function Reviews() {
  return (
    <Container pt={{ base: 32, xl: 50 }} pb={{ base: 32, md: 100, xl: 118 }}>
      <Title c={theme.colors.blue[4]} className={css.title}>
        Reviews
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
          <Carousel.Slide key={review.id}>
            <ReviewCard review={review} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}

export default Reviews;
