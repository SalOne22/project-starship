import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box } from '@mantine/core';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePassword } from '@/redux/operations';
import { notifications } from '@mantine/notifications';
import css from './ChangePasswordForm.module.css';
import { clearError, selectError } from '@/redux/slices/authSlice';
import clsx from 'clsx';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';

function ChangePasswordForm({ onClose }) {
  const dispatch = useDispatch();
  const [revealOldPassword, setRevealOldPassword] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);

  const error = useSelector(selectError);
  console.log(error);
  const form = useForm({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      oldPassword: (value) =>
        error
          ? ''
          : value.length < 6
          ? 'Password should be at least 6 characters long'
          : null,

      password: (value) =>
        value.length < 6
          ? 'Password should be at least 6 characters long'
          : null,
      confirmPassword: (value, values) => {
        if (value !== values.password) {
          return 'Passwords do not match';
        } else if (value.length < 6) {
          return 'Password must be at least 6 characters long';
        }
        return null;
      },
    },
  });

  const handleSubmitForm = async (values) => {
    if (values.oldPassword === values.confirmPassword) {
      handleMessage('Old and new passwords cannot be the same', 'red');
      values.password = '';
      values.confirmPassword = '';
      return;
    }

    try {
      await dispatch(
        updatePassword({
          oldPassword: values.oldPassword,
          newPassword: values.confirmPassword,
        }),
      ).unwrap();

      handleMessage('Password change success', 'green');
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
  };

  return (
    <Box w={340} mx="auto" className={css.changePassWrap}>
      <form onSubmit={form.onSubmit(handleSubmitForm)} className={css.form}>
        <PasswordInput
          label="Old Password"
          placeholder="Old Password"
          visible={revealOldPassword}
          styles={{
            section: { right: '10px' },
          }}
          rightSection={
            <div className={css.iconWrap}>
              <span
                className={css.eye}
                onClick={() => setRevealOldPassword((prev) => !prev)}
              >
                {revealOldPassword ? (
                  <IconEyeOff
                    style={{
                      width: 'var(--psi-icon-size)',
                      height: 'var(--psi-icon-size)',
                    }}
                  />
                ) : (
                  <IconEyeCheck
                    style={{
                      width: 'var(--psi-icon-size)',
                      height: 'var(--psi-icon-size)',
                    }}
                  />
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
            label: form.isValid('oldPassword')
              ? css.labelCorrect
              : form.errors.oldPassword || error
              ? css.labelError
              : css.label,
            error: error ? css.labelError : null,
            required: form.isValid('oldPassword')
              ? css.requiredCorrect
              : form.errors.oldPassword || error
              ? css.requiredError
              : css.required,
            rightSection: css.section,
            input: clsx(
              css.input,
              form.isValid('oldPassword') ? css.inputCorrect : null,
              error ? css.inputError : null,
            ),
          }}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          visible={revealPassword}
          styles={{
            section: { right: '10px' },
          }}
          rightSection={
            <div className={css.iconWrap}>
              <span
                className={css.eye}
                onClick={() => setRevealPassword((prev) => !prev)}
              >
                {revealPassword ? (
                  <IconEyeOff
                    style={{
                      width: 'var(--psi-icon-size)',
                      height: 'var(--psi-icon-size)',
                    }}
                  />
                ) : (
                  <IconEyeCheck
                    style={{
                      width: 'var(--psi-icon-size)',
                      height: 'var(--psi-icon-size)',
                    }}
                  />
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
          }}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Password"
          visible={revealConfirmPassword}
          styles={{
            section: { right: '10px' },
          }}
          rightSection={
            <div className={css.iconWrap}>
              <span
                className={css.eye}
                onClick={() => setRevealConfirmPassword((prev) => !prev)}
              >
                {revealConfirmPassword ? (
                  <IconEyeOff
                    style={{
                      width: 'var(--psi-icon-size)',
                      height: 'var(--psi-icon-size)',
                    }}
                  />
                ) : (
                  <IconEyeCheck
                    style={{
                      width: 'var(--psi-icon-size)',
                      height: 'var(--psi-icon-size)',
                    }}
                  />
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
          }}
        />

        <Group justify="center" mt="md">
          <Button type="submit">Change Password</Button>
        </Group>
      </form>
    </Box>
  );
}

ChangePasswordForm.propTypes = {
  onClose: PropTypes.func,
};

export default ChangePasswordForm;
