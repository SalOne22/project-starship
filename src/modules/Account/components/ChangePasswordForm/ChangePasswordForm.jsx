import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box } from '@mantine/core';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePassword } from '@/redux/operations';
import { notifications } from '@mantine/notifications';
import css from './ChangePasswordForm.module.css';
import { selectError } from '@/redux/slices/authSlice';
import clsx from 'clsx';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '@/theme';

function ChangePasswordForm({ onClose }) {
  const dispatch = useDispatch();
  const [revealOldPassword, setRevealOldPassword] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const error = useSelector(selectError);

  const form = useForm({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      oldPassword: (value) =>
        value.length < 6 ? t('changePasswordForm.errors.length') : null,

      password: (value) =>
        value.length < 6 ? t('changePasswordForm.errors.length') : null,
      confirmPassword: (value, values) => {
        if (value !== values.password) {
          return t('changePasswordForm.errors.matches');
        } else if (value.length < 6) {
          return t('changePasswordForm.errors.length');
        }
        return null;
      },
    },
  });

  const handleSubmitForm = async (values) => {
    if (values.oldPassword === values.confirmPassword) {
      handleMessage(
        t('changePasswordForm.notifications.error'),
        theme.colors.red[6],
      );
      values.password = '';
      values.confirmPassword = '';
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        updatePassword({
          oldPassword: values.oldPassword,
          newPassword: values.confirmPassword,
        }),
      ).unwrap();
      setIsLoading(false);

      handleMessage(
        t('changePasswordForm.notifications.success'),
        theme.colors.green[6],
      );
      onClose();
    } catch (error) {
      handleMessage(error, 'red');
    }
  };

  const handleMessage = (message, color) => {
    notifications.show({
      message: message,
      autoClose: 3000,
      color: color,
    });
    setIsLoading(false);
  };

  return (
    <Box w={340} mx="auto" className={css.changePassWrap}>
      <form onSubmit={form.onSubmit(handleSubmitForm)} className={css.form}>
        <PasswordInput
          withAsterisk
          label={t('changePasswordForm.oldPassword')}
          placeholder={t('changePasswordForm.oldPassword')}
          visible={revealOldPassword}
          rightSection={
            <div className={css.iconWrap}>
              <span
                className={css.eye}
                onClick={() => setRevealOldPassword((prev) => !prev)}
              >
                {revealOldPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </span>
              {form.errors?.oldPassword || error ? (
                <IconAlertCircle color="red" size={18} />
              ) : form.isValid('oldPassword') ? (
                <IconCircleCheck color="green" size={18} />
              ) : null}
            </div>
          }
          {...form.getInputProps('oldPassword')}
          classNames={{
            label:
              form.isValid('oldPassword') && !error
                ? css.labelCorrect
                : form.errors.oldPassword || error
                ? css.labelError
                : css.label,
            error: error ? css.labelError : null,
            required: clsx(
              form.isValid('oldPassword')
                ? css.requiredCorrect
                : form.errors.oldPassword
                ? css.requiredError
                : css.required,
              error && css.requiredError,
            ),
            rightSection: css.section,
            input: clsx(
              css.input,
              form.isValid('oldPassword') ? css.inputCorrect : null,
              error ? css.inputError : null,
            ),
            section: clsx(
              css.eyeBtnSection,
              !form.errors.oldPassword &&
                form.isValid('oldPassword') &&
                css.eyeBtnSectionActive,
              form.errors.oldPassword && css.eyeBtnSectionActive,
              error && css.eyeBtnSectionInActive,
            ),
          }}
        />

        <PasswordInput
          withAsterisk
          label={t('changePasswordForm.newPassword')}
          placeholder={t('changePasswordForm.newPassword')}
          visible={revealPassword}
          rightSection={
            <div className={css.iconWrap}>
              <span
                className={css.eye}
                onClick={() => setRevealPassword((prev) => !prev)}
              >
                {revealPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </span>
              {form.errors?.password ? (
                <IconAlertCircle color="red" size={18} />
              ) : form.isValid('password') ? (
                <IconCircleCheck color="green" size={18} />
              ) : null}
            </div>
          }
          {...form.getInputProps('password')}
          classNames={{
            label: form.isValid('password')
              ? css.labelCorrect
              : form.errors.password
              ? css.labelError
              : css.label,
            error: css.error,
            required: form.isValid('password')
              ? css.requiredCorrect
              : form.errors.password
              ? css.requiredError
              : css.required,
            rightSection: css.section,
            input: clsx(
              css.input,
              form.isValid('password') ? css.inputCorrect : null,
            ),
            section: clsx(
              css.eyeBtnSection,
              !form.errors.password &&
                form.isValid('password') &&
                css.eyeBtnSectionActive,
              form.errors.password && css.eyeBtnSectionActive,
            ),
          }}
        />

        <PasswordInput
          withAsterisk
          label={t('changePasswordForm.confirmedPassword')}
          placeholder={t('changePasswordForm.confirmedPassword')}
          visible={revealConfirmPassword}
          rightSection={
            <div className={css.iconWrap}>
              <span
                className={css.eye}
                onClick={() => setRevealConfirmPassword((prev) => !prev)}
              >
                {revealConfirmPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </span>
              {form.errors?.confirmPassword ? (
                <IconAlertCircle color="red" size={18} />
              ) : form.isValid('confirmPassword') ? (
                <IconCircleCheck color="green" size={18} />
              ) : null}
            </div>
          }
          {...form.getInputProps('confirmPassword')}
          classNames={{
            label: form.isValid('confirmPassword')
              ? css.labelCorrect
              : form.errors.confirmPassword
              ? css.labelError
              : css.label,
            error: css.error,
            required: form.isValid('confirmPassword')
              ? css.requiredCorrect
              : form.errors.confirmPassword
              ? css.requiredError
              : css.required,
            rightSection: css.section,
            input: clsx(
              css.input,
              form.isValid('confirmPassword') ? css.inputCorrect : null,
            ),
            section: clsx(
              css.eyeBtnSection,
              !form.errors.confirmPassword &&
                form.isValid('confirmPassword') &&
                css.eyeBtnSectionActive,
              form.errors.confirmPassword && css.eyeBtnSectionActive,
            ),
          }}
        />

        <Group justify="center" mt="md">
          <Button className={css.button} loading={isLoading} type="submit">
            {t('changePasswordForm.changePassBtn')}
          </Button>
        </Group>
      </form>
    </Box>
  );
}

ChangePasswordForm.propTypes = {
  onClose: PropTypes.func,
};

export default ChangePasswordForm;
