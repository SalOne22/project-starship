import { Box, Text, Group, Avatar, Stack, Title, Rating } from '@mantine/core';
import css from '../styles/ReviewCard.module.css';
import PropTypes from 'prop-types';

function ReviewCard({ review }) {
  const {
    rating,
    text,
    owner: { username, avatarURL },
  } = review;

  return (
    <Box className={css.wrap}>
      <Group gap={18} mb={24}>
        {avatarURL ? (
          <Avatar variant="transparent" radius="xl" size={50} src={avatarURL} />
        ) : (
          <Avatar color="teal" radius="xl" size={50}>
            {username[0]}
          </Avatar>
        )}

        <Stack align="flex-start" justify="flex-start" gap={13}>
          <Title order={3} className={css.username} c="dark.6">
            {username}
          </Title>
          <Rating value={rating} color="orange.4" readOnly />
        </Stack>
      </Group>
      <Text className={css.text} pl={{ base: 0, md: 68 }}>
        {text}
      </Text>
    </Box>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number,
    text: PropTypes.string,
    owner: PropTypes.shape({
      avatarURL: PropTypes.string,
      username: PropTypes.string,
    }),
  }),
};

export default ReviewCard;
