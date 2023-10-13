import {
  Text,
  Textarea,
  Rating,
  Button,
  Group,
  UnstyledButton,
  Dialog,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import css from '../styles/FeedbackForm.module.css';
import clsx from 'clsx';
import EditButton from '@/components/EditButton';
import DeleteButton from '@/components/DeleteButton';
import PropTypes from 'prop-types';

function FeedbackForm({ feedback, onClose }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(feedback.review);
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, review });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    toggle();
  };

  return (
    <form onSubmit={onSubmit} className={css.form}>
      <Text mb={8} className={css.label}>
        Rating
      </Text>
      <Rating value={rating} onChange={setRating} mb={20} />

      <Group mb={8} justify="space-between">
        <Text className={css.label}>Review</Text>
        {review && (
          <Group justify="center" gap={8}>
            <EditButton handleEdit={handleEdit} />
            <DeleteButton handleDelete={handleDelete} />
          </Group>
        )}
      </Group>

      <Textarea
        mb={14}
        variant="filled"
        radius={8}
        rows={6}
        className={css.input}
        placeholder="Enter text ..."
        value={review}
        onChange={(e) => setReview(e.currentTarget.value)}
      />

      {!review && (
        <Group gap={8} grow>
          <UnstyledButton
            type="submit"
            className={clsx(css.btn, css.btnPrimary)}
          >
            Save
          </UnstyledButton>
          <UnstyledButton
            onClick={onClose}
            className={clsx(css.btn, css.btnSecondary)}
          >
            Cancel
          </UnstyledButton>
        </Group>
      )}
      {isEditing && (
        <Group gap={8} grow>
          <UnstyledButton
            type="submit"
            className={clsx(css.btn, css.btnPrimary)}
          >
            Save
          </UnstyledButton>
          <UnstyledButton
            onClick={onClose}
            className={clsx(css.btn, css.btnSecondary)}
          >
            Cancel
          </UnstyledButton>
        </Group>
      )}

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
        w={300}
        className={css.dialog}
        pt={30}
      >
        <Text size="sm" mb="xs">
          Do you want do delete your review???
        </Text>

        <Group justify="center" gap="sm" grow>
          <Button onClick={close} variant="light" color="red" radius="md">
            Delete
          </Button>
          <Button onClick={close} variant="light" radius="md">
            Cancel
          </Button>
        </Group>
      </Dialog>
    </form>
  );
}

FeedbackForm.propTypes = {
  feedback: PropTypes.object,
  onClose: PropTypes.func,
};

export default FeedbackForm;
