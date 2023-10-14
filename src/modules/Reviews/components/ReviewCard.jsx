import { Box, Text, Group, Avatar, Stack, Title, Rating } from '@mantine/core';
import css from '../styles/ReviewCard.module.css';
import PropTypes from 'prop-types';

function ReviewCard({ review }) {
  return (
    <Box className={css.wrap}>
      <Group gap={18} mb={24}>
        <Avatar
          variant="transparent"
          radius="xl"
          size={50}
          src={review.avaUrl}
        />
        <Stack align="flex-start" justify="flex-start" gap={14}>
          <Title order={3} className={css.username} c="dark.6">
            {review.username}
          </Title>
          <Rating value={review.rating} color="orange.4" readOnly />
        </Stack>
      </Group>
      <Text className={css.text} pl={{ base: 0, md: 68 }}>
        {review.text}
      </Text>
    </Box>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.exact({
    id: PropTypes.number,
    avaUrl: PropTypes.string,
    username: PropTypes.string,
    rating: PropTypes.number,
    text: PropTypes.string,
  }),
};

export default ReviewCard;
