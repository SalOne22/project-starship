import {
  Box,
  Text,
  Group,
  Avatar,
  Stack,
  Title,
  Rating,
  UnstyledButton,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import css from '../styles/ReviewCard.module.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function ReviewCard({ review }) {
  const [isTruncateText, setIsTruncateText] = useState(true);

  useEffect(() => {
    setIsTruncateText(true);
  }, [review]);

  const showTruncateText = () => {
    setIsTruncateText(!isTruncateText);
  };

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
          <Title order={3} className={css.username}>
            {username}
          </Title>
          <Rating value={rating} color="orange.4" readOnly />
        </Stack>
      </Group>
      <UnstyledButton type="button" onClick={showTruncateText}>
        <Text
          className={clsx(css.text, !isTruncateText && css.truncateText)}
          pl={{ base: 0, md: 68 }}
        >
          {text}
        </Text>
      </UnstyledButton>
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
