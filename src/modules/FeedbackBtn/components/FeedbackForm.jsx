import {
  Text,
  Textarea,
  Rating,
  Button,
  Group,
  Modal,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useToggle } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import css from '../styles/FeedbackForm.module.css';
import EditButton from '@/components/EditButton';
import DeleteButton from '@/components/DeleteButton';
import {
  selectReviewsIsLoading,
  selectUserReview,
} from '@/modules/Reviews/redux/reviewsSelectors';
import {
  create,
  edit,
  remove,
} from '@/modules/Reviews/redux/reviewsOperations';

function FeedbackForm({ onClose }) {
  const feedback = useSelector(selectUserReview);
  const isLoading = useSelector(selectReviewsIsLoading);
  const dispatch = useDispatch();

  const [opened, modal] = useDisclosure(false);
  const [mode, toggleMode] = useToggle(['view', 'edit']);

  const [rating, setRating] = useState(feedback.rating);
  const [text, setText] = useState(feedback.text);
  const [isErrorRating, setIsErrorRating] = useState(false);
  const [isErrorText, setIsErrorText] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!rating && !text) {
      setIsErrorRating((prev) => !prev);
      setIsErrorText((prev) => !prev);
      return;
    }

    if (!rating) {
      setIsErrorRating((prev) => !prev);
      return;
    }

    if (!text) {
      setIsErrorText((prev) => !prev);
      return;
    }

    if (mode === 'edit') {
      try {
        await dispatch(edit({ rating, text }));
        toggleMode();
        notifications.show({
          color: 'teal',
          title: 'Feedback',
          message: 'Your review has been successfully changed!',
        });
      } catch (error) {
        notifications.show({
          color: 'red',
          title: 'Feedback',
          message: 'Something went wrong. Try changing a review later!',
        });
      }
      return;
    }

    try {
      await dispatch(create({ rating, text }));
      notifications.show({
        color: 'teal',
        title: 'Feedback',
        message: 'Your review has been successfully added!',
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Feedback',
        message: 'Something went wrong. Try adding a review later!',
      });
    }
  };

  const onChangeRating = (value) => {
    setRating(value);
    setIsErrorRating(false);
  };

  const onChangeText = (e) => {
    setText(e.currentTarget.value);
    setIsErrorText(false);
  };

  const onDelete = async () => {
    try {
      await dispatch(remove());
      modal.close();
      setRating(null);
      setText('');
      notifications.show({
        color: 'yellow',
        title: 'Feedback',
        message: 'Your review has been successfully deleted!',
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Feedback',
        message: 'Something went wrong. Try deleting a review later!',
      });
    }
  };

  const onCancel = () => {
    if (mode === 'edit') {
      setRating(feedback.rating);
      setText(feedback.text);
      toggleMode();
      return;
    }

    onClose();
  };

  return (
    <form onSubmit={onSubmit} className={css.form}>
      <Stack align="flex-start" justify="flex-start" gap={8} mb={20}>
        <Text className={css.label} c={isErrorRating ? 'red' : css.label.color}>
          Rating
        </Text>
        <Rating
          value={rating}
          onChange={onChangeRating}
          readOnly={mode === 'edit' || !feedback.rating ? false : true}
        />
      </Stack>

      <Group mb={8} justify="space-between">
        <Text className={css.label}>Review</Text>
        {feedback.text && (
          <Group justify="center" gap={8}>
            <EditButton handleEdit={toggleMode} />
            <DeleteButton handleDelete={modal.open} />
          </Group>
        )}
      </Group>

      <Textarea
        mb={14}
        rows={6}
        classNames={{ input: css.input }}
        placeholder="Enter text ..."
        value={text}
        onChange={onChangeText}
        withAsterisk
        error={isErrorText ? 'Required field' : false}
        readOnly={mode === 'edit' || !feedback.text ? false : true}
      />

      {(!feedback.text || mode === 'edit') && (
        <Group gap={8} grow>
          <Button
            type="submit"
            size="md"
            classNames={{
              root: clsx(css.btn, css.btnPrimary),
            }}
            loading={isLoading ? true : false}
          >
            Save
          </Button>
          <Button
            size="md"
            onClick={onCancel}
            classNames={{
              root: clsx(css.btn, css.btnSecondary),
              label: css.btnLabel,
            }}
          >
            Cancel
          </Button>
        </Group>
      )}

      <Modal
        size={350}
        radius={8}
        opened={opened}
        onClose={modal.close}
        title="Deleting a review"
        classNames={{
          content: css.contentModal,
          title: css.removeModalTitle,
        }}
      >
        <Text size="sm" mb={20}>
          Do you want do delete your review???
        </Text>

        <Group justify="center" gap="md">
          <Button
            onClick={onDelete}
            variant="filled"
            color="red"
            radius="md"
            loading={isLoading ? true : false}
          >
            Delete
          </Button>
          <Button onClick={modal.close} variant="light" radius="md">
            Cancel
          </Button>
        </Group>
      </Modal>
    </form>
  );
}

FeedbackForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default FeedbackForm;
