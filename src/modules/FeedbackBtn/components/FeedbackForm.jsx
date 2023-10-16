import {
  Text,
  Textarea,
  Rating,
  Button,
  Group,
  Modal,
  Stack,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useToggle } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { IconX, IconCheck } from '@tabler/icons-react';

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
  const { t } = useTranslation();

  const [opened, modal] = useDisclosure(false);
  const [mode, toggleMode] = useToggle(['view', 'edit']);

  const [rating, setRating] = useState(feedback.rating);
  const [text, setText] = useState(feedback.text);
  const [isErrorRating, setIsErrorRating] = useState(false);
  const [isErrorText, setIsErrorText] = useState(false);
  const [errorTextMsg, setIsErrorTextMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!rating && !text) {
      setIsErrorRating(true);
      setIsErrorText(true);
      setIsErrorTextMsg(t('feedback.form.requiredField'));
      return;
    }

    if (!rating) {
      setIsErrorRating(true);
      return;
    }

    if (!text || !text.trim()) {
      setIsErrorText(true);
      return;
    }

    if (text.trim().length > 300) {
      console.log(text.length);
      setIsErrorText((prev) => !prev);
      setIsErrorTextMsg(t('feedback.form.lengthTextField'));
      return;
    }

    if (mode === 'edit') {
      try {
        await dispatch(edit({ rating, text }));
        toggleMode();
        notifications.show({
          color: 'teal',
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          title: t('common.feedback'),
          message: t('feedback.notification.editSuccess'),
        });
        onClose();
      } catch (error) {
        notifications.show({
          color: 'red',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          title: t('common.feedback'),
          message: t('feedback.notification.editError'),
        });
      }
      return;
    }

    try {
      await dispatch(create({ rating, text }));
      notifications.show({
        color: 'teal',
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        title: t('common.feedback'),
        message: t('feedback.notification.createSuccess'),
      });
      onClose();
    } catch (error) {
      notifications.show({
        color: 'red',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        title: t('common.feedback'),
        message: t('feedback.notification.createError'),
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
        color: 'teal',
        title: t('common.feedback'),
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        message: t('feedback.notification.removeSuccess'),
      });
      onClose();
    } catch (error) {
      notifications.show({
        color: 'red',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        title: t('common.feedback'),
        message: t('feedback.notification.removeError'),
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
          {t('common.rating')}
        </Text>
        <Rating
          value={rating}
          onChange={onChangeRating}
          readOnly={mode === 'edit' || !feedback.rating ? false : true}
        />
      </Stack>

      <Group mb={8} justify="space-between">
        <Text className={css.label}>{t('common.review')}</Text>
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
        placeholder={t('common.enterText')}
        value={text}
        onChange={onChangeText}
        withAsterisk
        error={isErrorText ? errorTextMsg : false}
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
            {t('common.save')}
          </Button>
          <Button
            size="md"
            onClick={onCancel}
            classNames={{
              root: clsx(css.btn, css.btnSecondary),
              label: css.btnLabel,
            }}
          >
            {t('common.cancel')}
          </Button>
        </Group>
      )}

      <Modal
        size={350}
        radius={8}
        opened={opened}
        onClose={modal.close}
        title={t('feedback.modal.title')}
        classNames={{
          content: css.contentModal,
          title: css.removeModalTitle,
        }}
      >
        <Text size="sm" mb={20}>
          {t('feedback.modal.text')}
        </Text>

        <Group justify="center" gap="md">
          <Button
            onClick={onDelete}
            variant="filled"
            color="red"
            radius="md"
            loading={isLoading ? true : false}
          >
            {t('common.delete')}
          </Button>
          <Button onClick={modal.close} variant="light" radius="md">
            {t('common.cancel')}
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
