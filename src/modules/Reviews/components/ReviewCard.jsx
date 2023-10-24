import {
  Box,
  Text,
  Group,
  Avatar,
  Stack,
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
      <Group gap={18} mb={24} wrap="none">
        {avatarURL ? (
          <Avatar variant="transparent" radius="xl" size={50} src={avatarURL} />
        ) : (
          <Avatar color="teal" radius="xl" size={50}>
            {username[0]}
          </Avatar>
        )}

        <Stack align="flex-start" justify="flex-start" gap={12}>
          <Text lineClamp={1} className={css.username}>
            {username}
          </Text>
          <Rating value={rating} color="orange.4" readOnly />
        </Stack>
      </Group>
      <UnstyledButton type="button" onClick={showTruncateText}>
        {isTruncateText && (
          <Text className={css.text} pl={{ base: 0, md: 68 }} lineClamp={2}>
            {text}
          </Text>
        )}
        {!isTruncateText && (
          <Text
            className={clsx(css.text, css.truncateText)}
            pl={{ base: 0, md: 68 }}
          >
            {text}
          </Text>
        )}
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
