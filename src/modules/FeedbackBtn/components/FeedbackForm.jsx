import {
  Text,
  Textarea,
  Rating,
  Button,
  Group,
  Modal,
  Stack,
  rem,
  Box,
} from '@mantine/core';
import { useForm, isInRange, hasLength } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
  const [opened, modal] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);

  const feedback = useSelector(selectUserReview);
  const isLoading = useSelector(selectReviewsIsLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      rating: 0,
      text: '',
    },
    validate: {
      rating: isInRange({ min: 1, max: 5 }, t('feedback.form.requiredField')),
      text: hasLength({ min: 2, max: 300 }, t('feedback.form.lengthTextField')),
    },
  });

  useEffect(() => {
    if (!feedback) {
      setIsEditing(true);
      return;
    }
    form.setValues(feedback);
  }, [feedback]);

  const onSubmit = async ({ rating, text }) => {
    if (isEditing && feedback) {
      try {
        await dispatch(edit({ rating, text }));
        setIsEditing(false);
        onClose();
        notifications.show({
          color: 'teal',
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          title: t('common.feedback'),
          message: t('feedback.notification.editSuccess'),
        });
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
      onClose();
      notifications.show({
        color: 'teal',
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        title: t('common.feedback'),
        message: t('feedback.notification.createSuccess'),
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        title: t('common.feedback'),
        message: t('feedback.notification.createError'),
      });
    }
  };

  const onDelete = async () => {
    try {
      await dispatch(remove());
      modal.close();
      onClose();
      notifications.show({
        color: 'teal',
        title: t('common.feedback'),
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        message: t('feedback.notification.removeSuccess'),
      });
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
    if (isEditing && !feedback) onClose();
    if (isEditing) {
      setIsEditing(false);
      return;
    }
    onClose();
  };

  return (
    <Box className={css.form}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack align="flex-start" justify="flex-start" gap={8} mb={20}>
          <Text className={css.label}>{t('common.rating')}</Text>
          <Rating
            value={form.values.rating}
            onChange={(val) => form.setFieldValue('rating', val)}
            readOnly={!isEditing}
          />
          {form.errors?.rating && (
            <Text className={css.error}>{form.errors.rating}</Text>
          )}
        </Stack>

        <Group mb={8} justify="space-between">
          <Text className={css.label}>{t('common.review')}</Text>
          {feedback && (
            <Group justify="center" gap={8}>
              <EditButton handleEdit={() => setIsEditing(true)} />
              <DeleteButton handleDelete={modal.open} />
            </Group>
          )}
        </Group>

        <Textarea
          mb={14}
          rows={6}
          classNames={{ input: css.input }}
          placeholder={t('common.enterText')}
          withAsterisk
          readOnly={!isEditing}
          {...form.getInputProps('text')}
        />

        {isEditing && (
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
    </Box>
  );
}

FeedbackForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default FeedbackForm;
